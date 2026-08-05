import { AuthUser } from "./AuthUser";

export interface LoginResponse {

    token: string;

    user: AuthUser | null;

}