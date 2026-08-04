import { Adherence } from "./Adherence";
import { NextDose } from "./NextDose";
import { PatientInfo } from "./PatientInfo";
import { TodayAgenda } from "./TodayAgenda";
import { TreatmentSummary } from "./TreatmentSummary";

export interface PatientDashboardDTO {

    patient: PatientInfo;

    adherence: Adherence;

    nextDose?: NextDose;

    todayAgenda: TodayAgenda[];

    activeTreatments: TreatmentSummary[];

}