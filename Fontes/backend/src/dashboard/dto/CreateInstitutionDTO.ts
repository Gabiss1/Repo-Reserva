import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  
  export class CreateInstitutionDto {
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
  
    @IsNotEmpty()
    @IsString()
    cnpj: string;
  
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
  }