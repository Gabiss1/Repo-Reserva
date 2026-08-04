export class AgendaItemDto {

    doseId!: string;
    medicationName!: string;
    strength!: string;
    scheduledTime!: Date;
    isTaken!: boolean;
    patientName?: string;

}