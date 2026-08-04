import { InstitutionInfo } from "./InstitutionInfo";
import { PatientSummary } from "./PatientSummary";
import { TreatmentSummary } from "./TreatmentSummary";

export interface InstitutionDashboard {

    institution: InstitutionInfo;

    totalPatients: number;

    activeTreatments: number;

    todayAppointments: number;

    patients: PatientSummary[];

    recentTreatments: TreatmentSummary[];

}