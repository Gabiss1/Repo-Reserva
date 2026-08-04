export interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    patientId: number;
}