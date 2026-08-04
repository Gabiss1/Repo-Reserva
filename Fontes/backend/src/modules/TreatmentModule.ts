import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentsController } from 'src/controllers/treatmentsController';
import { DoseHistory } from 'src/entidades/DoseHistory';
import { Patient } from 'src/entidades/Patient';
import { Treatment } from 'src/entidades/Treatment';
import { User } from 'src/entidades/User';
import { TreatmentsService } from 'src/services/treatmentsService';
import { DoseHistoryModule } from './DoseHistoryModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Treatment,
      Patient,
      User,
    ]),
    DoseHistoryModule,
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
  exports: [TreatmentsService],
})
export class TreatmentModule {}