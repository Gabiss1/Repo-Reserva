import { PatientSummary } from "./PatientSummary";
import { TodayAgenda } from "./TodayAgenda";

export interface InstitutionDashboard {
    institution: {
        id: string;
        name: string;
        cnpj: string;
    };

    statistics: {
        totalPatients: number;
        activeTreatments: number;
        todayDoses: number;
        takenToday: number;
        missedToday: number;
        adherencePercentage: number;
    };

    patients: PatientSummary[];

    todayAgenda: TodayAgenda[];
}