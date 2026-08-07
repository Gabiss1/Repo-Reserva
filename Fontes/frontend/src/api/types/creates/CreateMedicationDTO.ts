import { PharmaceuticalForm } from "../enums/PharmaceuticalForm";

export interface CreateMedicationDTO {

    name: string;

    dosage: string;

    pharmaceuticalForm: PharmaceuticalForm;

    categoryId: string;

}