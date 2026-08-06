import api from "../api";

import { CreateUserDTO } from "../types/creates/CreateUserDTO";
import { User } from "../types/entities/User";

export async function createUser(
    data: CreateUserDTO,
): Promise<User> {

    const response = await api.post(
        "/users",
        data,
    );

    return response.data;

}

export async function getUser(
    id: string,
): Promise<User> {

    const response = await api.get(
        `/users/${id}`,
    );

    return response.data;

}

export async function updateUser(
    id: string,
    data: Partial<CreateUserDTO>,
): Promise<User> {

    const response = await api.patch(
        `/users/${id}`,
        data,
    );

    return response.data;

}

export async function updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
) {

    const response = await api.patch(
        `/users/${id}/password`,
        {
            oldPassword,
            newPassword,
        },
    );

    return response.data;

}