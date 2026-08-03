import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DashboardController } from "./DashboardController";
import { DashboardService } from "./DashboardService";

import { Treatment } from '../entidades/Treatment';
import { DoseHistory } from '../entidades/DoseHistory';
import { Patient } from '../entidades/Patient';
import { Institution } from '../entidades/Institution';

import { ReportsModule } from "../reports/reports.module";

@Module({

    imports:[

        TypeOrmModule.forFeature([
            Institution,
            Patient,
            Treatment,
            DoseHistory
        ]),

        ReportsModule

    ],

    controllers:[
        DashboardController
    ],

    providers:[
        DashboardService
    ],

    exports:[
        DashboardService
    ]

})
export class DashboardModule{}