import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsController } from 'src/controllers/institutionController';
import { Institution } from 'src/entidades/Institution';
import { Patient } from 'src/entidades/Patient';
import { InstitutionsService } from 'src/services/institutionService';
import { TreatmentModule } from './TreatmentModule';

@Module({

    imports: [
        TypeOrmModule.forFeature([
            Institution,
            Patient,
        ]),
        TreatmentModule
    ],

    providers: [
        InstitutionsService,
    ],

    controllers: [
        InstitutionsController,
    ],

    exports: [
        InstitutionsService,
    ],

})
export class InstitutionModule {}