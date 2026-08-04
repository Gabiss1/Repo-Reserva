import api from "../api";
import { Patient } from "../types/entities/Patient";


export async function getPatients(): Promise<Patient[]> {

    const response = await api.get("/patients");

    return response.data;
}



export async function getPatientById(
    id:number
): Promise<Patient>{

    const response = await api.get(`/patients/${id}`);

    return response.data;
}



export async function createPatient(
    patient: Partial<Patient>
): Promise<Patient>{

    const response = await api.post(
        "/patients",
        patient
    );

    return response.data;
}



export async function updatePatient(
    id:number,
    patient:Partial<Patient>
):Promise<Patient>{

    const response = await api.put(
        `/patients/${id}`,
        patient
    );

    return response.data;
}



export async function deletePatient(
    id:number
){

    await api.delete(`/patients/${id}`);

}