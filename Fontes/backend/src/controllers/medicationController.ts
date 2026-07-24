import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { MedicationsService } from 'src/services/medicationService';
import { Medication } from 'src/entidades/Medication';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  create(@Body() data: Partial<Medication>) {
    return this.medicationsService.create(data);
  }

  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.medicationsService.search(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicationsService.remove(id);
  }
}