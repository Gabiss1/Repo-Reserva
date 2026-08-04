import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/usersController';
import { User } from 'src/entidades/User';
import { UsersService } from 'src/services/usersService';

@Module({

    imports: [
        TypeOrmModule.forFeature([User]),
    ],

    providers: [
        UsersService,
    ],

    controllers: [
        UsersController,
    ],

    exports: [
        UsersService,
    ],

})
export class UserModule {}