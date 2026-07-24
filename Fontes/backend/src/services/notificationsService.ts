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

  @Cron(CronExpression.EVERY_MINUTE)
  async checkScheduledDoses() {
    const now = new Date();
    const startOfMinute = new Date(now);
    startOfMinute.setSeconds(0, 0);
    const endOfMinute = new Date(now);
    endOfMinute.setSeconds(59, 999);

    // Carregando relações com o novo formato de objeto
    const pendingDoses = await this.doseHistoryRepository.find({
      where: {
        scheduledTime: Between(startOfMinute, endOfMinute),
        isTaken: false,
      },
      relations: {
        treatment: {
          patient: true,
          user: true,
          medication: true
        }
      },
    });

    if (pendingDoses.length > 0) {
      this.logger.log(`Disparando ${pendingDoses.length} notificações de dose.`);
      
      pendingDoses.forEach(dose => {
        // Identifica se o alvo da notificação é um Paciente ou Usuário Autônomo
        const targetId = dose.treatment.patient?.id || dose.treatment.user?.id;
        
        if (targetId) {
          const payload = {
            title: 'Hora do Medicamento!',
            message: `Está na hora de tomar ${dose.treatment.medication.name} (${dose.treatment.medication.strength || ''})`,
            doseId: dose.id,
            medicationName: dose.treatment.medication.name
          };

          this.notificationsGateway.sendNotification(targetId, payload);
        }
      });
    }
  }
}