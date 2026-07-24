import { Controller, Get, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PatientsService } from 'src/services/patientsService';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get('search/cpf')
  findByCpf(@Query('cpf') cpf: string) {
    return this.patientsService.findByCpf(cpf);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientsService.findOne(id);
  }

  @Delete('/cpf')
  remove(@Query('cpf') cpf: string) {
    return this.patientsService.remove(cpf);
  }
}