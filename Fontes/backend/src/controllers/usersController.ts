import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from 'src/services/usersService';
import { CreateUserDto } from 'src/dtos/userDTO';

@Controller('users')
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
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }
}