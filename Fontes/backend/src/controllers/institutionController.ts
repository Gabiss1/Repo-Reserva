import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { InstitutionsService } from 'src/services/institutionService';
import { Patient } from 'src/entidades/Patient';
import { CreateTreatmentDto } from 'src/dtos/treatmentsDTO';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) { }

  // Create de Instituição
  @Post()
  create(@Body() dto: { name: string; cnpj: string }) {
    return this.institutionsService.create(dto.name, dto.cnpj);
  }

  // Read com especificação de id para filtragem especifica de Instituição
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.institutionsService.findOne(id);
  }

  // Read com especificação de id para encontrar paciente afiliado a instituição
  @Get(':id/patients')
  listPatients(@Param('id', ParseUUIDPipe) id: string) {
    return this.institutionsService.findAllPatients(id);
  }

  // Create de Paciente para relaciona-lo a instituição afiliada
  @Post(':id/patients')
  registerPatient(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() patientData: Partial<Patient>
  ){
    return this.institutionsService.addPatient(id, patientData);
  }

  // Create de tratamento interno de paciente com identificação de cpf
  @Post(':id/patients/:cpf/treatments')
  assignTreatment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('cpf') cpf: string,
    @Body() treatmentData: CreateTreatmentDto
  ) {
    return this.institutionsService.addTreatmentToPatient(id, cpf, treatmentData);
  }
}