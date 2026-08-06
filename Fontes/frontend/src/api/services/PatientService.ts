import api from "../api";
import { CreatePatientRequest } from "../types/creates/CreatePatientDTO";
import { Patient } from "../types/entities/Patient";
import { UpdatePatientRequest } from "../types/updates/UpdatePatientRequest";

export async function getPatients(): Promise<Patient[]> {
  const response = await api.get("/patients");

  return response.data;
}

export async function getPatientById(id: string): Promise<Patient> {
  const response = await api.get(`/patients/${id}`);

  return response.data;
}

export async function createPatient(
  institutionId: string,
  patient: CreatePatientRequest
): Promise<Patient> {
  const response = await api.post(
    `/institutions/${institutionId}/patients`,
    patient
  );

  return response.data;
}

export async function updatePatient(
  id: string,
  patient: UpdatePatientRequest
): Promise<Patient> {
  const response = await api.patch(
    `/patients/${id}`,

    patient
  );

  return response.data;
}

export async function deletePatient(id: number) {
  await api.delete(`/patients/${id}`);
}
