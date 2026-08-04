export class TodayAgendaDto {

  doseId!: string;

  medication!: string;

  dosage!: string;

  scheduledTime!: Date;

  isTaken!: boolean;

  canCheckIn!: boolean;

  patientId?: string;

  patientName?: string;

}