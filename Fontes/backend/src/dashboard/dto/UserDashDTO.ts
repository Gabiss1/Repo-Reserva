import { AdherenceDto } from "./AdherenceDTO";
import { NextDoseDto } from "./NextDoseDTO";
import { TodayAgendaDto } from "./TodayAgendaDTO";
import { TreatmentSummaryDto } from "./TreatmentSummaryDTO";

export class UserDashboardDto {

    user!: {

        id: string;
        name: string;
        cpf: string;
        email: string;

    };

    adherence!: AdherenceDto;
    nextDose?: NextDoseDto;
    activeTreatments!: TreatmentSummaryDto[];
    todayAgenda!: TodayAgendaDto[];

}