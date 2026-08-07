import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class CreateTreatmentDTO {
  @IsOptional()
  @IsString()
  userCpf?: string;

  @IsOptional()
  @IsString()
  patientCpf?: string;

  @IsUUID()
  medicationId!: string;

  @IsInt()
  @Min(1)
  intervalHours!: number;

  @IsInt()
  @Min(1)
  durationDays!: number;

  @IsNotEmpty()
  startDate!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
