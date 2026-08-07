import { AdherenceDto } from "../AdherenceDTO";
import { NextDoseDto } from "../NextDoseDTO";
import { PatientInfoDto } from "../summary/PatientInfoDTO";
import { TodayAgendaDto } from "../TodayAgendaDTO";
import { TreatmentSummaryDto } from "../summary/TreatmentSummaryDTO";

export class PatientDashboardDto {

    patient!: PatientInfoDto;

    adherence!: AdherenceDto;

    nextDose?: NextDoseDto;

    todayAgenda!: TodayAgendaDto[];

    activeTreatments!: TreatmentSummaryDto[];

}