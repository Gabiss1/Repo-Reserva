import { Module } from "@nestjs/common";
import { InstitutionModule } from "src/modules/InstitutionModule";
import { PatientModule } from "src/modules/PatientModule";
import { ReportModule } from "src/modules/ReportModule";
import { TreatmentModule } from "src/modules/TreatmentModule";
import { UserModule } from "src/modules/UserModule";
import { DashboardController } from "./DashboardController";
import { DashboardService } from "./DashboardService";

@Module({
    imports: [
      PatientModule,
      UserModule,
      InstitutionModule,
      TreatmentModule,
      ReportModule,
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
  })
  export class DashboardModule {}