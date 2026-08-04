import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { DashboardService } from './DashboardService';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('patient/:id')
  getPatientDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.dashboardService.getPatientDashboard(id);
  }

  @Get('user/:id')
  getUserDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.dashboardService.getUserDashboard(id);
  }

  @Get('institution/:id')
  getInstitutionDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.dashboardService.getInstitutionDashboard(id);
  }
}