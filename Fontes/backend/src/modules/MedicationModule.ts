import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationsController } from 'src/controllers/medicationController';
import { Medication } from 'src/entidades/Medication';
import { MedicationsService } from 'src/services/medicationService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication]),
  ],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [MedicationsService],
})
export class MedicationModule {}