export interface CreateTreatmentRequest {

    medicationId: string;

    patientCpf: string;

    intervalHours: number;

    durationDays: number;

    startDate: string;

}