import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { InstitutionsService } from 'src/services/instituitionService';
import { Patient } from 'src/entidades/Patient';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  create(@Body() dto: { name: string; cnpj: string }) {
    return this.institutionsService.create(dto.name, dto.cnpj);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.institutionsService.findOne(id);
  }

  @Get(':id/patients')
  listPatients(@Param('id', ParseUUIDPipe) id: string) {
    return this.institutionsService.findAllPatients(id);
  }

  @Post(':id/patients')
  registerPatient(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() patientData: Partial<Patient>


  ) {
    return this.institutionsService.addPatient(id, patientData);
  }
}