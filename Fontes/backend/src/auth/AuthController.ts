import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";

import { AuthService } from "./AuthService";
import { LoginDto } from "./dto/LoginDTO";
import { JwtAuthGuard } from "./guards/JwtAuthGuards";

@Controller("auth")
export class AuthController {

    constructor(

        private readonly authService: AuthService,

    ) { }

    @Post("login")
    async login(

        @Body()
        loginDto: LoginDto,

    ) {

        return this.authService.login(loginDto);

    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    me(
        @Req() request: any,
    ) {

        return request.user;

    }

}