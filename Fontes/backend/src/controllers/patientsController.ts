import { Controller, Get, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PatientsService } from 'src/services/patientsService';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // Read de Paciente para listar todos
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  // Read com especificação de CPF para filtragem especifica de Paciente
  @Get('search/cpf')
  findByCpf(@Query('cpf') cpf: string) {
    return this.patientsService.findByCpf(cpf);
  }

  // Read com especificação de id para filtragem especifica de Paciente
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientsService.findOne(id);
  }

  // Delete de paciente por meio de CPF
  @Delete('/cpf')
  remove(@Query('cpf') cpf: string) {
    return this.patientsService.remove(cpf);
  }
}