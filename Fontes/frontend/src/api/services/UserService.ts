import api from "../api";
import { UpdatePasswordRequest } from "../types/profile/UpdatePasswordRequest";
import { UpdateProfileRequest } from "../types/profile/UpdateProfileRequest";

export async function getUser(id: string) {
  const response = await api.get(`/users/${id}`);

  return response.data;
}

export async function updateUser(id: string, data: UpdateProfileRequest) {
  const response = await api.patch(`/users/${id}`, data);
    
  return response.data;
}

export async function updatePassword(id: string, data: UpdatePasswordRequest) {
  const response = await api.patch(`/users/${id}/password`, data);

  return response.data;
}
