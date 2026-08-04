import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Institution } from "src/entidades/Institution";
import { User } from "src/entidades/User";
import { AuthService } from "./AuthService";
import { JwtStrategy } from "./strategies/JwtStrategy";
import { ConfigService } from "@nestjs/config";

import { StringValue } from "ms";
import { AuthController } from "./AuthController";
import { InstitutionModule } from "src/modules/InstitutionModule";
import { UserModule } from "src/modules/UserModule";
import { RolesGuard } from "./guards/RolesGuards";

@Module({
    imports: [

        UserModule,

        InstitutionModule,

        PassportModule,

        JwtModule.registerAsync({

            inject: [ConfigService],

            useFactory: (config: ConfigService) => ({

                secret: config.getOrThrow<string>("JWT_SECRET"),

                signOptions: {

                    expiresIn: config.getOrThrow<string>(
                        "JWT_EXPIRES_IN",
                    ) as StringValue,

                },

            }),

        }),

    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtStrategy,
        RolesGuard,
    ],

    exports: [
        AuthService,
    ],

})
export class AuthModule { }