import { Module } from "@nestjs/common";
import { InstitutionModule } from "src/modules/InstitutionModule";
import { PatientModule } from "src/modules/PatientModule";
import { ReportModule } from "src/modules/ReportModule";
import { TreatmentModule } from "src/modules/TreatmentModule";
import { UserModule } from "src/modules/UserModule";
import { DashboardController } from "./DashboardController";
import { DashboardService } from "./DashboardService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoseHistory } from "src/entidades/DoseHistory";
import { Institution } from "src/entidades/Institution";
import { Patient } from "src/entidades/Patient";
import { Treatment } from "src/entidades/Treatment";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoseHistory,
      Treatment,
      Patient,
      Institution,
    ]),
    PatientModule,
    UserModule,
    InstitutionModule,
    TreatmentModule,
    ReportModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }