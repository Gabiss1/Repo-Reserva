export interface UpdateTreatmentDTO {
  medicationId?: string;

  intervalHours?: number;

  durationDays?: number;

  startDate?: string;

  status?: "ACTIVE" | "FINISHED" | "CANCELLED";
}
