import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
} from "@nestjs/common";
import { InstitutionsService } from "src/services/institutionService";
import { Patient } from "src/entidades/Patient";
import { CreateTreatmentDto } from "src/dtos/treatmentsDTO";
import { Roles } from "src/auth/decorators/Roles";
import { UserRole } from "src/auth/dto/enums/UserRole";
import { UpdatePasswordDto } from "src/dashboard/dto/UpdatePasswordDTO";
import { UpdateInstitutionDto } from "src/dashboard/dto/UpdateInstitutionDTO";
import { CreateInstitutionDto } from "src/dashboard/dto/CreateInstitutionDTO";

@Controller("institutions")
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  // Create de Instituição
  @Post()
  create(
    @Body()
    dto: CreateInstitutionDto
  ) {
    return this.institutionsService.create(dto);
  }

  // Read com especificação de id para filtragem especifica de Instituição
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.institutionsService.findOne(id);
  }

  // Read com especificação de id para encontrar paciente afiliado a instituição
  @Get(":id/patients")
  listPatients(@Param("id", ParseUUIDPipe) id: string) {
    return this.institutionsService.findAllPatients(id);
  }

  // Create de Paciente para relaciona-lo a instituição afiliada
  @Roles(UserRole.INSTITUTION)
  @Post(":id/patients")
  registerPatient(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() patientData: Partial<Patient>
  ) {
    return this.institutionsService.addPatient(id, patientData);
  }

  // Create de tratamento interno de paciente com identificação de cpf
  @Roles(UserRole.INSTITUTION)
  @Post(":id/patients/:cpf/treatments")
  assignTreatment(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("cpf") cpf: string,
    @Body() treatmentData: CreateTreatmentDto
  ) {
    return this.institutionsService.addTreatmentToPatient(
      id,
      cpf,
      treatmentData
    );
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe)
    id: string,

    @Body()
    data: UpdateInstitutionDto
  ) {
    return this.institutionsService.update(id, data);
  }

  @Patch(":id/password")
  updatePassword(
    @Param("id", ParseUUIDPipe)
    id: string,

    @Body()
    data: UpdatePasswordDto
  ) {
    return this.institutionsService.updatePassword(
      id,
      data.oldPassword,
      data.newPassword
    );
  }
}
