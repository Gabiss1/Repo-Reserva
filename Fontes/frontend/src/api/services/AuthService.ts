import api from "../api";
import { LoginResponse } from "../types/auth/LoginResponse";

export async function login(
    email: string,
    password: string,
): Promise<LoginResponse> {

    const response = await api.post(
        "/auth/login",
        {
            email,
            password,
        },
    );

    localStorage.setItem(
        "token",
        response.data.token,
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user),
    );

    return response.data;
}

export function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

}