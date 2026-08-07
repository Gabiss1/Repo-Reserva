import api from "../api";
import { InstitutionDashboard } from "../types/dashboard/InstitutionDashboard";
import { PatientDashboardDTO } from "../types/dashboard/PatientDashboardDTO";
import { UserDashboard } from "./UserDashboard";

export async function getUserDashboard(id: string) {
  const response = await api.get<UserDashboard>(`/dashboard/user/${id}`);

  return response.data;
}

export async function getPatientDashboard(
  id: string,
): Promise<PatientDashboardDTO> {
  const response = await api.get(`/dashboard/patient/${id}`);

  return response.data;
}

export async function getInstitutionDashboard(
  id: string,
): Promise<InstitutionDashboard> {
  const response = await api.get(`/dashboard/institution/${id}`);

  return response.data;
}
