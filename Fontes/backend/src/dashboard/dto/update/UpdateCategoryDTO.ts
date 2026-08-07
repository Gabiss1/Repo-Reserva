import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCategoryDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

}