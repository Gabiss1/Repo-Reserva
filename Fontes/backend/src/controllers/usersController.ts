import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
} from "@nestjs/common";
import { UsersService } from "src/services/usersService";
import { CreateUserDto } from "src/dtos/userDTO";
import { UpdatePasswordDto } from "src/dashboard/dto/update/UpdatePasswordDTO";
import { UpdateUserDto } from "src/dashboard/dto/update/UpdateUserDTO";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create de Usuário
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // Read de Usuário para listar todos
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Read com especificação de id para filtragem especifica de Usuário
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe)
    id: string,

    @Body()
    data: UpdateUserDto
  ) {
    return this.usersService.update(id, data);
  }

  @Patch(":id/password")
  updatePassword(
    @Param("id", ParseUUIDPipe)
    id: string,

    @Body()
    data: UpdatePasswordDto
  ) {
    return this.usersService.updatePassword(
      id,
      data.oldPassword,
      data.newPassword
    );
  }
}
