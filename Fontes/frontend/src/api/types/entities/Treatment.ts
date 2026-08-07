import { Dose } from "./Dose";
import { Medication } from "./Medication";
import { Patient } from "./Patient";

export type TreatmentStatus = "ACTIVE" | "FINISHED" | "CANCELLED";

export interface Treatment {
  id: string;

  patient?: Patient;

  medication: Medication;

  intervalHours: number;

  durationDays: number;

  startDate: string;

  status: TreatmentStatus;

  doses?: Dose[];
}
