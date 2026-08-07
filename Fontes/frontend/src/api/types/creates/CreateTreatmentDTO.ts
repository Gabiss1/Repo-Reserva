export class CreateTreatmentDto {

    medicationId!: string;

    intervalHours!: number;

    durationDays!: number;

    startDate!: string;

    patientCpf?: string;
}