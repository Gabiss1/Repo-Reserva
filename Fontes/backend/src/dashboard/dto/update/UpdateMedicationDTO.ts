import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { PharmaceuticalForm } from "../enum/PharmaceuticalForm";

export class UpdateMedicationDTO {

    @IsString()
    @IsOptional()
    name?: string;


    @IsString()
    @IsOptional()
    dosage?: string;


    @IsEnum(PharmaceuticalForm)
    @IsOptional()
    pharmaceuticalForm?: PharmaceuticalForm;


    @IsUUID()
    @IsOptional()
    categoryId?: string;

}