import api from "../api";
import { CreateMedicationDTO } from "../types/creates/CreateMedicationDTO";

import { Medication } from "../types/entities/Medication";
import { UpdateMedicationRequest } from "../types/updates/UpdateMedicationRequest";

export async function findAllMedications(): Promise<Medication[]> {
  const response = await api.get("/medications");

  return response.data;
}

export async function findMedicationById(id: string): Promise<Medication> {
  const response = await api.get(`/medications/${id}`);

  return response.data;
}

export async function searchMedications(term: string): Promise<Medication[]> {
  const response = await api.get(`/medications/search?q=${term}`);

  return response.data;
}

export async function createMedication(
  dto: CreateMedicationDTO,
): Promise<Medication> {
  const response = await api.post("/medications", dto);

  return response.data;
}

export async function updateMedication(
  id: string,
  dto: UpdateMedicationRequest,
): Promise<Medication> {
  const response = await api.patch(`/medications/${id}`, dto);

  return response.data;
}

export async function deleteMedication(id: string): Promise<void> {
  await api.delete(`/medications/${id}`);
}
