import api from "../api";
import { CreateMedicationDTO } from "../types/creates/CreateMedicationDTO";
import { Medication } from "../types/entities/Medication";
import { UpdateMedicationRequest } from "../types/updates/UpdateMedicationRequest";

export async function getMedication(id: string): Promise<Medication> {
  const response = await api.get(`/medications/${id}`);

  return response.data;
}

export async function getMedications() {
  const response = await api.get("/medications");

  return response.data;
}

export async function createMedication(
  medication: Partial<CreateMedicationDTO>,
): Promise<CreateMedicationDTO> {
  const response = await api.post("/medications", medication);

  return response.data;
}

export async function updateMedication(
  id: string,
  data: UpdateMedicationRequest,
) {
  const response = await api.patch(`/medications/${id}`, data);

  return response.data;
}

export async function deleteMedication(id: string) {
  await api.delete(`/medications/${id}`);
}
