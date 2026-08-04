import { AuthUserDto } from "./AuthUserDTO";

export class LoginResponseDto {

    token!: string;

    user!: AuthUserDto;

}