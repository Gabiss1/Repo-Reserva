import { User } from "../entities/User";

export interface LoginResponse {

    token: string;

    user: User;

}