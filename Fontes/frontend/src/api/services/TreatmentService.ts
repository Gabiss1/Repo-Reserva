import api from "../api";
import { CreateTreatmentRequest } from "../types/creates/CreateTreatmentDTO";
import { Treatment } from "../types/entities/Treatment";

export async function createTreatment(
    treatment: CreateTreatmentRequest
): Promise<Treatment> {

    const response = await api.post(

        "/treatments",

        treatment,

    );

    return response.data;

}

export async function getMedications() {

    const response = await api.get(
        "/medications",
    );

    return response.data;

}