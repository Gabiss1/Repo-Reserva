import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe
} from "@nestjs/common";

import { DashboardService } from "./DashboardService";

@Controller("dashboard")
export class DashboardController {

    constructor(
        private readonly dashboardService: DashboardService
    ){}

    @Get("institution/:id")
    async getInstitutionDashboard(
        @Param("id", ParseUUIDPipe) id:string
    ){
        return this.dashboardService.getInstitutionDashboard(id);
    }

    @Get("patient/:id")
    async getPatientDashboard(
        @Param("id", ParseUUIDPipe) id:string
    ){
        return this.dashboardService.getPatientDashboard(id);
    }

    @Get("user/:id")
    async getUserDashboard(
        @Param("id", ParseUUIDPipe) id:string
    ){
        return this.dashboardService.getUserDashboard(id);
    }

}