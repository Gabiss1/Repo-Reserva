import { AdherenceDto } from "./AdherenceDTO";
import { NextDoseDto } from "./NextDoseDTO";
import { PatientInfoDto } from "./PatientInfoDTO";
import { TodayAgendaDto } from "./TodayAgendaDTO";
import { TreatmentSummaryDto } from "./TreatmentSummaryDTO";

export class PatientDashboardDto {

    patient!: PatientInfoDto;

    adherence!: AdherenceDto;

    nextDose?: NextDoseDto;

    todayAgenda!: TodayAgendaDto[];

    activeTreatments!: TreatmentSummaryDto[];

}