import { Adherence } from "../types/dashboard/Adherence";
import { NextDose } from "../types/dashboard/NextDose";
import { TodayAgenda } from "../types/dashboard/TodayAgenda";
import { TreatmentSummary } from "../types/dashboard/TreatmentSummary";


export interface UserDashboard {

    adherence: Adherence;

    nextDose?: NextDose;

    todayAgenda: TodayAgenda[];

    activeTreatments: TreatmentSummary[];

}