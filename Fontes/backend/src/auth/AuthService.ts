import {
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { InstitutionsService } from "src/services/institutionService";
import { UsersService } from "src/services/usersService";
import { LoginDto } from "./dto/LoginDTO";
import { LoginResponseDto } from "./dto/LoginResponseDTO";
import { Institution } from "src/entidades/Institution";
import { User } from "src/entidades/User";
import { UserRole } from "./dto/enums/UserRole";
import { JwtPayload } from "./dto/interfaces/JwtPayload";

@Injectable()
export class AuthService {

    constructor(

        private readonly usersService: UsersService,

        private readonly institutionsService: InstitutionsService,

        private readonly jwtService: JwtService,

    ) { }

    async login(
        loginDto: LoginDto,
    ): Promise<LoginResponseDto> {

        const user =
            await this.usersService.findByEmail(
                loginDto.email,
            );

        if (user) {

            return this.loginUser(
                user,
                loginDto.password,
            );

        }

        const institution =
            await this.institutionsService.findByEmail(
                loginDto.email,
            );

        if (institution) {

            return this.loginInstitution(
                institution,
                loginDto.password,
            );

        }

        throw new UnauthorizedException(
            "E-mail ou senha inválidos.",
        );

    }

    private async loginUser(
        user: User,
        password: string,
    ): Promise<LoginResponseDto> {

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password,
            );

        if (!passwordMatches) {

            throw new UnauthorizedException(
                "E-mail ou senha inválidos.",
            );

        }

        const token =
            await this.generateToken(
                user.id,
                user.email,
                UserRole.USER,
            );

        return {

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                role: UserRole.USER,

            },

        };

    }

    private async loginInstitution(
        institution: Institution,
        password: string,
    ): Promise<LoginResponseDto> {

        const passwordMatches =
            await bcrypt.compare(
                password,
                institution.password,
            );

        if (!passwordMatches) {

            throw new UnauthorizedException(
                "E-mail ou senha inválidos.",
            );

        }

        const token =
            await this.generateToken(
                institution.id,
                institution.email,
                UserRole.INSTITUTION,
            );

        return {

            token,

            user: {

                id: institution.id,

                name: institution.name,

                email: institution.email,

                role: UserRole.INSTITUTION,

            },

        };

    }


    private async generateToken(
        id: string,
        email: string,
        role: UserRole,
    ): Promise<string> {

        const payload: JwtPayload = {

            sub: id,

            email,

            role,

        };

        return this.jwtService.signAsync(payload);

    }

}