import api from "../api";
import { User } from "../types/User";


interface LoginResponse {

    token:string;

    user:User;

}



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

    return response.data;

}



export function logout(){

    localStorage.removeItem("token");

}