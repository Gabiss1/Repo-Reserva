import { IsString, IsEmail, IsEnum, IsOptional, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  cnpj?: string; // Exclusivo para Instituições

  @IsUUID()
  @IsOptional()
  institutionId?: string; // Para vincular um paciente a uma clínica
}