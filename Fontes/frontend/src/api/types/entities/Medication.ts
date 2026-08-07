import { PharmaceuticalForm } from "../enums/PharmaceuticalForm";

export interface Medication {

    id: string;

    name: string;

    dosage: string;

    pharmaceuticalForm: PharmaceuticalForm;

    category: {

        id: string;

        name: string;

    };

}