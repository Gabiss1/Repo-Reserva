import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PharmaceuticalForm } from "../enum/PharmaceuticalForm";

export class CreateMedicationDTO {

    @IsString()
    @IsNotEmpty()
    name!: string;


    @IsString()
    @IsNotEmpty()
    dosage!: string;


    @IsEnum(PharmaceuticalForm)
    pharmaceuticalForm!: PharmaceuticalForm;


    @IsUUID()
    categoryId!: string;

}