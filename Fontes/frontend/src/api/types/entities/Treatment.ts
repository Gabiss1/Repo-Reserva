import { Dose } from "./Dose";
import { Medication } from "./Medication";


export interface Treatment {

    id: string;

    medication: Medication;

    dosage: string;

    frequency: string;

    startDate: string;

    endDate?: string;

    doses?: Dose[];

}