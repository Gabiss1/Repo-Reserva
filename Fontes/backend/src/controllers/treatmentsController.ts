import { Controller, Post, Body, Get, Param, Patch, ParseUUIDPipe, Query } from '@nestjs/common';
import { TreatmentsService } from 'src/services/treatmentsService';
import { CreateTreatmentDto } from 'src/dtos/treatmentsDTO';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  // Create de Tratamento
  @Post()
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto);
  }

  // Read de Tratamento dentro da agenda por meio de ID as quais foram não atendidas
  @Get('agenda/missed/:id')
  async getMissed(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('type') type: 'user' | 'patient' = 'patient'
  ) {
    return this.treatmentsService.getMissedDoses(id, type);
  }

  // Read de Tratamento dentro da agenda por meio de ID no dia pesquisado
  @Get('agenda/today/:id')
  async getToday(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('type') type: 'user' | 'patient' = 'patient'
  ) {
    return this.treatmentsService.getDailyAgenda(id, type, new Date());
  }

  // Read de Tratamento dentro da agenda por meio de ID
  @Get('agenda/:id')
  getAgenda(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('type') type: 'user' | 'patient' = 'patient'
  ) {
    return this.treatmentsService.getDailyAgenda(id, type);
  }

  @Patch('check-in/:doseId')
  async checkIn(@Param('doseId', ParseUUIDPipe) doseId: string) {
    return this.treatmentsService.checkInDose(doseId);
  }
}