import api from "../api";
import { CreateTreatmentDto } from "../types/creates/CreateTreatmentDTO";
import { Treatment } from "../types/entities/Treatment";
import { UpdateTreatmentDTO } from "../types/updates/UpdateTreatmentDTO";

export async function createTreatment(
    treatment: CreateTreatmentDto
): Promise<Treatment> {

    const response = await api.post(

        "/treatments",

        treatment,

    );

    return response.data;

}

export async function findAllTreatments(): Promise<Treatment[]> {

    const response =
        await api.get("/treatments");

    return response.data;
}

export async function getTreatmentById(
    id: string
): Promise<Treatment> {

    const response =
        await api.get(`/treatments/${id}`);

    return response.data;
}

export async function updateTreatment(
    id: string,
    treatment: UpdateTreatmentDTO
): Promise<Treatment> {

    const response =
        await api.patch(
            `/treatments/${id}`,
            treatment
        );

    return response.data;
}