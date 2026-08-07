import api from "../api";
import { InstitutionDashboard } from "../types/dashboard/InstitutionDashboard";

export async function getInstitutionDashboard(
    id: string
): Promise<InstitutionDashboard> {

    const response = await api.get(
        `/dashboard/institution/${id}`
    );

    return response.data;
}