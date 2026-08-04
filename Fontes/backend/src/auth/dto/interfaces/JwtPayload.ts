import { UserRole } from "../enums/UserRole";

export interface JwtPayload {

    sub: string;

    email: string;

    role: UserRole;

}