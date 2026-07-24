import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ReportsService } from 'src/services/reportsService';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /**
   * Retorna a adesão individual de um perfil (User ou Patient).
   * Ex: /reports/adherence/ID_AQUI?type=user
   */
  @Get('adherence/:id')
  getAdherence(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('type') type: 'user' | 'patient' = 'patient'
  ) {
    return this.reportsService.getAdherence(id, type); // Chama o método híbrido no Service
  }

  /**
   * Retorna o resumo completo para o Dashboard da Instituição.
   * Focado exclusivamente em pacientes vinculados à clínica.
   */
  @Get('summary/institution/:instId')
  getInstitutionSummary(@Param('instId', ParseUUIDPipe) instId: string) {
    return this.reportsService.getInstitutionSummary(instId);
  }
}