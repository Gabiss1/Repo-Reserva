import { UserRole } from "./enums/UserRole";

export class AuthUserDto {

    id!: string;

    name!: string;

    email!: string;

    role!: UserRole;

}