import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DoseHistory } from 'src/entidades/DoseHistory';
import { NotificationsGateway } from 'src/gateways/notifications';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(DoseHistory)
    private doseHistoryRepository: Repository<DoseHistory>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  // Função executada automaticamente a cada minuto para verificar doses agendadas
  @Cron(CronExpression.EVERY_MINUTE)
  async checkScheduledDoses() {

    // Obtém o horário atual e define o intervalo do minuto corrente
    const now = new Date();
    const startOfMinute = new Date(now);
    startOfMinute.setSeconds(0, 0);

    const endOfMinute = new Date(now);
    endOfMinute.setSeconds(59, 999);

    // Busca todas as doses agendadas para o minuto atual
    // que ainda não foram marcadas como administradas
    const pendingDoses = await this.doseHistoryRepository.find({
      where: {
        scheduledTime: Between(startOfMinute, endOfMinute),
        isTaken: false,
      },
      relations: {
        treatment: {
          patient: true,
          user: true,
          medication: true,
        },
      },
    });

    // Caso existam doses pendentes, inicia o envio das notificações
    if (pendingDoses.length > 0) {
      this.logger.log(`Disparando ${pendingDoses.length} notificações de dose.`);

      pendingDoses.forEach(dose => {

        // Identifica o destinatário da notificação
        // (Paciente vinculado ou Usuário Autônomo)
        const targetId = dose.treatment.patient?.id || dose.treatment.user?.id;

        if (targetId) {

          // Monta os dados que serão enviados ao cliente
          const payload = {
            title: 'Hora do Medicamento!',
            message: `Está na hora de tomar ${dose.treatment.medication.name} (${dose.treatment.medication.pharmaceuticalForm || ''})`,
            doseId: dose.id,
            medicationName: dose.treatment.medication.name,
          };

          // Envia a notificação em tempo real através do Gateway
          this.notificationsGateway.sendNotification(targetId, payload);
        }
      });
    }
  }
}