import {
    IsOptional,
    IsString,
    Length,
  } from "class-validator";
  
  export class UpdatePatientDto {
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    cpf?: string;
  
  }