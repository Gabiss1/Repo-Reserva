export interface TreatmentSummary {
  id: string;

  patientName: string;

  medicationName: string;

  intervalHours: number;

  durationDays: number;

  startDate: string;

  status: "ACTIVE" | "FINISHED" | "CANCELLED";
}
