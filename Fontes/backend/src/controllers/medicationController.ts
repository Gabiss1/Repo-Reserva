import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { MedicationsService } from 'src/services/medicationService';
import { Medication } from 'src/entidades/Medication';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  // Create de Medicação
  @Post()
  create(@Body() data: Partial<Medication>) {
    return this.medicationsService.create(data);
  }

  // Read de Medicação para listar todos
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  // Read de Medicação para 
  @Get('search')
  search(@Query('q') q: string) {
    return this.medicationsService.search(q);
  }

  // Read com especificação de id para filtragem especifica de Medicação
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicationsService.remove(id);
  }
}