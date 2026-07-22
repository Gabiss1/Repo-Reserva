import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from 'src/services/usersService';
import { CreateUserDto } from 'src/dtos/userDTO';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get('institution/:id/patients')
  findPatients(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findPatientsByInstitution(id);
  }
}