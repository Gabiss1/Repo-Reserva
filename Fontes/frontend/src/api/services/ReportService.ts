import api from "../api";
import { Report } from "../types/entities/Report";

export async function getReports(
    patientId:number
):Promise<Report[]>{

    const response = await api.get(
        `/reports/patient/${patientId}`
    );

    return response.data;
}



export async function createReport(
    report:Partial<Report>
):Promise<Report>{

    const response = await api.post(
        "/reports",
        report
    );

    return response.data;
}