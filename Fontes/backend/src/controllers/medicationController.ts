import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Patch,
} from "@nestjs/common";

import { MedicationsService } from "src/services/medicationService";
import { Medication } from "src/entidades/Medication";

@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  // Create de Medicação
  @Post()
  create(
    @Body()
    data: Partial<Medication>
  ) {
    return this.medicationsService.create(data);
  }

  // Read de todas as medicações
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  // Busca por nome
  @Get("search")
  search(
    @Query("q")
    q: string
  ) {
    return this.medicationsService.search(q);
  }

  // Read por ID
  @Get(":id")
  findOne(
    @Param("id", ParseUUIDPipe)
    id: string
  ) {
    return this.medicationsService.findOne(id);
  }

  // Atualização
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe)
    id: string,

    @Body()
    data: Partial<Medication>
  ) {
    return this.medicationsService.update(id, data);
  }

  // Delete
  @Delete(":id")
  remove(
    @Param("id", ParseUUIDPipe)
    id: string
  ) {
    return this.medicationsService.remove(id);
  }
}
