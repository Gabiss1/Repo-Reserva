import { IsString, IsNumber, IsUUID, IsDateString, IsOptional, Min } from 'class-validator';

export class CreateTreatmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  medicationId: string;

  @IsNumber()
  @Min(1)
  frequency: number; // Ex: 3 vezes ao dia

  @IsNumber()
  @Min(1)
  intervalHours: number; // Ex: 8 em 8 horas

  @IsNumber()
  @Min(1)
  durationDays: number; // Ex: 7 dias

  @IsDateString()
  startDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}