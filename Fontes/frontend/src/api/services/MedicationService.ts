import api from "../api";
import { Medication } from "../types/Medication";


export async function getMedications(
    patientId:number
):Promise<Medication[]>{

    const response = await api.get(
        `/medications/patient/${patientId}`
    );

    return response.data;
}



export async function createMedication(
    medication:Partial<Medication>
):Promise<Medication>{

    const response = await api.post(
        "/medications",
        medication
    );

    return response.data;
}



export async function deleteMedication(
    id:number
){

    await api.delete(
        `/medications/${id}`
    );

}