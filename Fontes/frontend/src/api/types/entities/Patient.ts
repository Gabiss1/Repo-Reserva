import { Institution } from "./Institution";

export interface Patient {

    id: string;

    name: string;

    cpf: string;

    institution?: Institution;
}