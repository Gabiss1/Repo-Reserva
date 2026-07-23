import { IsString, IsNumber, IsUUID, IsDateString, IsOptional, Min, ValidateIf } from 'class-validator';

export class CreateTreatmentDto {
  // Agora aceitamos CPF no lugar de IDs internos para facilitar a busca no Service
  @IsString()
  @IsOptional()
  userCpf?: string;

  @IsString()
  @IsOptional()
  patientCpf?: string;

  @IsUUID()
  medicationId!: string;

  @IsNumber()
  @Min(1)
  intervalHours!: number; // Ex: 8 em 8 horas

  @IsNumber()
  @Min(1)
  durationDays!: number; // Ex: 7 dias

  @IsDateString()
  startDate!: string;

  @IsString()
  @IsOptional()
  notes?: string;
}