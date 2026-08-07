import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class UpdateTreatmentDTO {
  @IsOptional()
  @IsUUID()
  medicationId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  intervalHours?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationDays?: number;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsIn(["ACTIVE", "FINISHED", "CANCELLED"])
  status?: "ACTIVE" | "FINISHED" | "CANCELLED";

  @IsOptional()
  @IsString()
  notes?: string;
}
