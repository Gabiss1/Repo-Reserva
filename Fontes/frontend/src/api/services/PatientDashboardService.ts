import api from "../api";

import { PatientDashboardDTO } from "../types/dashboard/PatientDashboardDTO";

export async function getPatientDashboard(): Promise<PatientDashboardDTO> {

    const response = await api.get(
        "/dashboard/patient",
    );

    return response.data;

}