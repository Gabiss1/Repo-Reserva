import api from "../api";
import { InstitutionDashboard } from "../types/dashboard/InstitutionDashboard";
import { PatientDashboardDTO } from "../types/dashboard/PatientDashboardDTO";

export async function getPatientDashboard():
Promise<PatientDashboardDTO>{

    const response =
        await api.get(
            "/dashboard/patient",
        );

    return response.data;

}

export async function getInstitutionDashboard():
Promise<InstitutionDashboard>{

    const response =
        await api.get(
            "/dashboard/institution",
        );

    return response.data;

}