import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Body,
  Patch,
} from "@nestjs/common";
import { UpdatePatientDto } from "src/dashboard/dto/update/UpdatePatientDTO";
import { Patient } from "src/entidades/Patient";
import { PatientsService } from "src/services/patientsService";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get("search/cpf")
  findByCpf(@Query("cpf") cpf: string) {
    return this.patientsService.findByCpf(cpf);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseUUIDPipe)
    id: string
  ) {
    return this.patientsService.findOne(id);
  }

  // Delete de paciente por meio de CPF
  @Delete("/cpf")
  remove(@Query("cpf") cpf: string) {
    return this.patientsService.remove(cpf);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, data);
  }
}
