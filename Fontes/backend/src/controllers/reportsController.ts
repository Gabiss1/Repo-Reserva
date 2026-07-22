import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ReportsService } from '../services/reportsService';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('adherence/patient/:id')
  async getPatientAdherence(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.getPatientAdherence(id);
  }

  @Get('summary/institution/:id')
  async getInstitutionSummary(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.getWeeklySummary(id);
  }
}