import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from 'src/controllers/reportsController';
import { DoseHistory } from 'src/entidades/DoseHistory';
import { Treatment } from 'src/entidades/Treatment';
import { ReportsService } from 'src/services/reportsService';
import { DoseHistoryModule } from './DoseHistoryModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Treatment,
    ]),
    DoseHistoryModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportModule {}