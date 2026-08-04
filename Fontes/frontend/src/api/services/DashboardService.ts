import api from "../axios";

export async function getPatientDashboard(id: string) {
    const { data } = await api.get(`/dashboard/patient/${id}`);
    return data;
}

export async function getInstitutionDashboard(id: string) {
    const { data } = await api.get(`/dashboard/institution/${id}`);
    return data;
}