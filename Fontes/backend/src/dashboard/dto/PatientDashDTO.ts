import { AdherenceDto } from "./AdherenceDTO";
import { NextDoseDto } from "./NextDoseDTO";
import { TodayAgendaDto } from "./TodayAgendaDTO";
import { TreatmentSummaryDto } from "./TreatmentSummaryDTO";

export class PatientDashboardDto {

    patient: PatientInfoDto;

    adherence: AdherenceDto;

    nextDose?: NextDoseDto;

    todayAgenda: TodayAgendaDto[];

    activeTreatments: TreatmentSummaryDto[];

}