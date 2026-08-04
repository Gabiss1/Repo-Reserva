import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from 'src/controllers/patientsController';
import { Patient } from 'src/entidades/Patient';
import { PatientsService } from 'src/services/patientsService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientModule {}