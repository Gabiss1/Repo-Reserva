import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ReportsService } from 'src/services/reportsService';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Rota para ver adesão individual do paciente
  @Get('adherence/patient/:id')
  getPatientAdherence(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.getPatientAdherence(id);
  }

  // Rota principal do Dashboard da Clínica
  @Get('summary/institution/:instId')
  getInstitutionSummary(@Param('instId', ParseUUIDPipe) instId: string) {
    return this.reportsService.getInstitutionSummary(instId);
  }
}