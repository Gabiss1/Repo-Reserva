import { Controller, Post, Body, Get, Param, Patch, ParseUUIDPipe } from '@nestjs/common';
import { TreatmentsService } from 'src/services/treatmentsService';
import { CreateTreatmentDto } from 'src/dtos/treatmentsDTO';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto);
  }

  @Get('agenda/:patientId')
  getAgenda(@Param('patientId') patientId: string) {
    return this.treatmentsService.getPatientAgenda(patientId);
  }

  @Get('agenda/today/:patientId')
  async getToday(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.treatmentsService.getDailyAgenda(patientId);
  }

  @Get('agenda/missed/:patientId')
  async getMissed(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.treatmentsService.getMissedDoses(patientId);
  }

  @Patch('check-in/:doseId')
  async checkIn(@Param('doseId', ParseUUIDPipe) doseId: string) {
    return this.treatmentsService.checkInDose(doseId);
  }
}