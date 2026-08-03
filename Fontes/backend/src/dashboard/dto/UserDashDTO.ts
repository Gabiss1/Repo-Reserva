import { NotificationItemDto } from "./NotificationItemDTO";
import { TreatmentSummaryDto } from "./TreatmentSummaryDTO";
import { AgendaItemDto } from "./AgendaItemDTO";
import { DashboardStatisticsDto } from "./StatisticDashDTO";

export class UserDashboardDto {

    user!: {

        id:string;

        name:string;

    }

    statistics!: DashboardStatisticsDto;

    todayAgenda!: AgendaItemDto[];

    treatments!: TreatmentSummaryDto[];

    notifications!: NotificationItemDto[];

}