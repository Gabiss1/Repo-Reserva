import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { DashboardService } from './DashboardService';
import { Roles } from 'src/auth/decorators/Roles';
import { UserRole } from 'src/auth/dto/enums/UserRole';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  // Read de dashboard com informações específicas de um Paciente
  @Get('patient/:id')
  getPatientDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.dashboardService.getPatientDashboard(id);
  }

  // Read de dashboard com informações específicas de um Usuário Autônomo
  @Get('user/:id')
  getUserDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.dashboardService.getUserDashboard(id);
  }

  // Read de dashboard com informações específicas de uma Instituição
  @Get('institution/:id')
  getInstitutionDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.dashboardService.getInstitutionDashboard(id);
  }
}