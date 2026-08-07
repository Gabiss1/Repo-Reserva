import { PharmaceuticalForm } from "../enums/PharmaceuticalForm";

export interface UpdateMedicationRequest {

    name?: string;

    dosage?: string;

    pharmaceuticalForm?: PharmaceuticalForm;

    categoryId?: string;

}