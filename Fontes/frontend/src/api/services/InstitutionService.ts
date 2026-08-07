import api from "../api";
import { CreateInstitutionDTO } from "../types/creates/CreateInstitutionDTO";

import { Institution } from "../types/entities/Institution";
import { UpdatePasswordRequest } from "../types/updates/UpdatePasswordRequest";

export async function createInstitution(
    data: CreateInstitutionDTO,
): Promise<Institution> {

    const response = await api.post(
        "/institutions",
        data,
    );

    return response.data;

}

export async function getInstitution(
    id: string,
): Promise<Institution> {

    const response = await api.get(
        `/institutions/${id}`,
    );

    return response.data;

}

export async function updateInstitution(
    id: string,
    data: Partial<CreateInstitutionDTO>,
): Promise<Institution> {

    const response = await api.patch(
        `/institutions/${id}`,
        data,
    );

    return response.data;

}

export async function updateInstitutionPassword(
    id: string,
    data: UpdatePasswordRequest
) {

    const response = await api.patch(
        `/institutions/${id}/password`,
        {
            data
        },
    );

    return response.data;

}