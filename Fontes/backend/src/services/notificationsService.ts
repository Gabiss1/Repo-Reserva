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
    
    // Define a janela de busca (o minuto atual)
    const startOfMinute = new Date(now);
    startOfMinute.setSeconds(0, 0);
    
    const endOfMinute = new Date(now);
    endOfMinute.setSeconds(59, 999);

    const pendingDoses = await this.doseHistoryRepository.find({
      where: {
        scheduledTime: Between(startOfMinute, endOfMinute),
        isTaken: false,
      },
      relations: ['treatment', 'treatment.patient', 'treatment.medication'],
    });

    if (pendingDoses.length > 0) {
      this.logger.log(`Disparando ${pendingDoses.length} notificações de dose.`);
      
      pendingDoses.forEach(dose => {
        const patientId = dose.treatment.patient.id;
        const payload = {
          title: 'Hora do Medicamento!',
          message: `Está na hora de tomar ${dose.treatment.medication.name} (${dose.treatment.medication.strength})`,
          doseId: dose.id,
        };

        this.notificationsGateway.sendNotification(patientId, payload);
      });
    }
  }
}