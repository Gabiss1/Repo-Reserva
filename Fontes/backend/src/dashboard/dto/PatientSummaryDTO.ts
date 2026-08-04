export class PatientSummaryDto {

    id!: string;
    name!: string;
    cpf!: string;
    activeTreatments!: number;
    adherencePercentage!: number;
    nextDose?: Date;
    institutionName?: string;

}