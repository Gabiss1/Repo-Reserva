import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { Between } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Institution } from '../entidades/Institution';
import { Patient } from '../entidades/Patient';
import { Treatment } from '../entidades/Treatment';
import { DoseHistory } from '../entidades/DoseHistory';
import { Medication } from '../entidades/Medication';

import { InstitutionDashboardDto } from './dto/InstitutionDashDTO';
import { PatientDashboardDto } from './dto/PatientDashDTO';
import { UserDashboardDto } from './dto/UserDashDTO';

import { PatientsService } from 'src/services/patientsService';
import { ReportsService } from 'src/services/reportsService';
import { TreatmentsService } from 'src/services/treatmentsService';
import { TreatmentSummaryDto } from './dto/TreatmentSummaryDTO';
import { DoseHistorySummaryDto } from './dto/DoseHistorySummaryDTO';
import { TodayAgendaDto } from './dto/TodayAgendaDTO';
import { AdherenceDto } from './dto/AdherenceDTO';
import { PatientStatisticsDto } from './dto/PatientStatisticsDTO';
import { InstitutionTodayDto } from './dto/InnstitutionTodayDTO';
import { InstitutionStatisticsDto } from './dto/InstitutionStatisticsDTO';
import { InstitutionsService } from 'src/services/institutionService';
import { PatientSummaryDto } from './dto/PatientSummaryDTO';

@Injectable()
export class DashboardService {

    constructor(

        @InjectRepository(DoseHistory)
        private readonly doseHistoryRepository: Repository<DoseHistory>,

        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,

        @InjectRepository(Treatment)
        private readonly treatmentRepository: Repository<Treatment>,

        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Treatment>,

        private readonly reportsService: ReportsService,
        private readonly treatmentsService: TreatmentsService,
        private readonly patientsService: PatientsService,
        private readonly institutionsService: InstitutionsService,

    ) { }

    /**
     * Dashboard principal da Instituição
     */

    private async getInstitutionDoses(
        institutionId: string,
    ): Promise<DoseHistory[]> {

        return this.doseHistoryRepository.find({

            where: {
                treatment: {
                    patient: {
                        institution: {
                            id: institutionId,
                        },
                    },
                },
            },

            relations: {
                treatment: {
                    medication: true,
                    patient: true,
                },
            },

            order: {
                scheduledTime: 'ASC',
            },

        });

    }

    /**
     * Dashboard do Usuário Autônomo
     */
    async getUserDashboard(
        userId: string,
    ): Promise<UserDashboardDto> {

        throw new Error(
            'Método ainda não implementado.',
        );

    }

    //------------------------------------------------------
    // MÉTODOS PRIVADOS
    //------------------------------------------------------

    /**
     * Últimos pacientes cadastrados
     */
    private async getRecentPatients(
        institutionId: string,
    ) {

        const patients =
            await this.patientRepository.find({

                where: {
                    institution: {
                        id: institutionId,
                    },
                },

                order: {
                    createdAt: 'DESC',
                },

                take: 5,

            });

        return patients.map(patient => ({

            id: patient.id,

            name: patient.name,

            cpf: patient.cpf,

            createdAt: patient.createdAt,

        }));

    }

    /**
     * Agenda do dia
     */
    private async getTodayAgenda(
        institutionId: string,
    ) {

        const today = new Date();

        const start = new Date(today);
        start.setHours(0, 0, 0, 0);

        const end = new Date(today);
        end.setHours(23, 59, 59, 999);

        const doses =
            await this.doseHistoryRepository.find({

                where: {

                    scheduledTime: Between(
                        start,
                        end,
                    ),

                    treatment: {
                        patient: {
                            institution: {
                                id: institutionId,
                            },
                        },
                    },

                },

                relations: {

                    treatment: {

                        medication: true,

                        patient: true,

                    },

                },

                order: {

                    scheduledTime: 'ASC',

                },

            });

        return doses.map(dose => ({

            id: dose.id,

            patient: dose.treatment.patient.name,

            medication: dose.treatment.medication.name,

            scheduledTime: dose.scheduledTime,

            isTaken: dose.isTaken,

        }));

    }

    /**
     * Gráfico dos últimos dias
     */
    private async getAdherenceChart(
        institutionId: string,
    ) {

        const chart: any[] = [];

        const today = new Date();

        for (let i = 6; i >= 0; i--) {

            const currentDay = new Date(today);

            currentDay.setDate(today.getDate() - i);

            const start = new Date(currentDay);
            start.setHours(0, 0, 0, 0);

            const end = new Date(currentDay);
            end.setHours(23, 59, 59, 999);

            const doses =
                await this.doseHistoryRepository.find({

                    where: {

                        scheduledTime: Between(
                            start,
                            end,
                        ),

                        treatment: {

                            patient: {

                                institution: {
                                    id: institutionId,
                                },

                            },

                        },

                    },

                });

            const total = doses.length;

            const taken =
                doses.filter(d => d.isTaken).length;

            chart.push({

                label: currentDay.toLocaleDateString(
                    'pt-BR',
                    {
                        weekday: 'short',
                    },
                ),

                taken,

                total,

                percentage:
                    total === 0
                        ? 0
                        : Math.round(
                            (taken / total) * 100,
                        ),

            });

        }

        return chart;

    }

    //===========================================================Institution===================================================================================

    async getInstitutionDashboard(
        institutionId: string,
    ): Promise<InstitutionDashboardDto> {

        const institution =
            await this.institutionsService.findOne(
                institutionId,
            );

        const patients =
            await this.institutionsService.findAllPatients(
                institutionId,
            );

        const report =
            await this.reportsService.getInstitutionSummary(
                institutionId,
            );

        const todayAgenda =
            await this.getInstitutionTodayAgenda(
                institutionId,
            );

        return {

            institution: {

                id: institution.id,

                name: institution.name,

                cnpj: institution.cnpj,

            },

            statistics:
                await this.getInstitutionStatistics(
                    institutionId,
                    report,
                    todayAgenda,
                ),

            today:
                this.getInstitutionToday(
                    todayAgenda,
                ),

            patients:
                await this.getPatientSummaries(
                    patients,
                ),

        };

    }

    private async getInstitutionTodayAgenda(
        institutionId: string,
    ): Promise<DoseHistory[]> {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return this.doseHistoryRepository.find({

            where: {

                scheduledTime: Between(
                    start,
                    end,
                ),

                treatment: {

                    patient: {

                        institution: {

                            id: institutionId,

                        },

                    },

                },

            },

            relations: {

                treatment: {

                    medication: true,

                    patient: true,

                },

            },

            order: {

                scheduledTime: 'ASC',

            },

        });

    }

    private getInstitutionToday(
        agenda: DoseHistory[],
    ): InstitutionTodayDto {

        const now = new Date();

        const pending =
            agenda.filter(
                dose =>
                    !dose.isTaken &&
                    dose.scheduledTime >= now,
            );

        const missed =
            agenda.filter(
                dose =>
                    !dose.isTaken &&
                    dose.scheduledTime < now,
            );

        return {

            pendingDoses:
                pending.length,

            missedDoses:
                missed.length,

            nextDoseTime:
                pending[0]?.scheduledTime,

        };

    }

    private async getInstitutionStatistics(
        institutionId: string,
        report: any,
        agenda: DoseHistory[],
    ): Promise<InstitutionStatisticsDto> {

        const activeTreatments =
            await this.treatmentRepository.count({

                where: {

                    status: 'ACTIVE',

                    patient: {

                        institution: {

                            id: institutionId,

                        },

                    },

                },

            });

        return {

            totalPatients:
                report.activePatients,

            activeTreatments,

            adherencePercentage:
                report.overallAdherence,

            dosesToday:
                agenda.length,

            dosesTakenToday:
                agenda.filter(
                    dose => dose.isTaken,
                ).length,

        };

    }

    private async getPatientSummaries(
        patients: Patient[],
    ): Promise<PatientSummaryDto[]> {

        const summaries: PatientSummaryDto[] = [];

        for (const patient of patients) {

            const summary =
                await this.buildTreatmentSummary(
                    patient.cpf,
                    patient.id,
                    'patient',
                );

            const nextDose = this.getNextDose(summary.treatments);

            summaries.push({

                id: patient.id,

                name: patient.name,

                cpf: patient.cpf,

                activeTreatments:
                    summary.treatments.length,

                adherencePercentage:
                    summary.adherence.percentage,

                nextDose:
                    nextDose?.scheduledTime,

            });

        }

        return summaries;

    }

    //===========================================================Patient=======================================================================================

    async getPatientDashboard(
        patientId: string,
    ): Promise<PatientDashboardDto> {

        const patient = await this.patientsService.findOne(patientId);

        const summary = await this.buildTreatmentSummary(
            patient.cpf,
            patient.id,
            'patient',
        );

        const nextDose = this.getNextDose(summary.treatments);

        const todayAgenda =
            await this.treatmentsService.getDailyAgenda(
                patient.id,
                'patient',
            );

        return {

            patient: {

                id: patient.id,

                name: patient.name,

                cpf: patient.cpf,

                institution: patient.institution?.name,

            },

            adherence: summary.adherence,

            nextDose: nextDose
                ? {
                    doseId: nextDose.id,
                    medication: nextDose.treatment.medication.name,
                    scheduledTime: nextDose.scheduledTime,
                }
                : undefined,

            activeTreatments:
                summary.treatments.map(
                    treatment =>
                        this.buildTreatmentDto(
                            treatment,
                        ),
                ),

            todayAgenda:
                this.buildTodayAgenda(
                    todayAgenda,
                ),

        };

    }

    private async buildTreatmentSummary(
        cpf: string,
        ownerId: string,
        type: 'user' | 'patient',
    ) {

        const treatments = await this.treatmentsService.findAllByCpf(
            cpf,
            type,
            'ACTIVE',
        );

        const adherence = await this.reportsService.getAdherence(
            ownerId,
            type,
        );

        return {
            treatments,
            adherence,
            nextDose: this.getNextDose(treatments),
        };
    }

    private buildTreatmentDto(
        treatment: Treatment,
    ): TreatmentSummaryDto {
        const nextDose = this.getNextDose([treatment]);

        return {
            id: treatment.id,
            medicationId: treatment.medication.id,
            medication: treatment.medication.name,
            dosage: treatment.medication.strength,
            dosageForm: treatment.medication.dosageForm,
            intervalHours: treatment.intervalHours,
            durationDays: treatment.durationDays,
            startDate: treatment.startDate,
            status: treatment.status,
            nextDose: nextDose?.scheduledTime,
        };
    }

    private buildTodayAgenda(
        agenda: DoseHistory[],
    ): TodayAgendaDto[] {

        return agenda.map(dose => ({

            doseId:
                dose.id,

            medication:
                dose.treatment.medication.name,

            dosage:
                dose.treatment.medication.strength,

            scheduledTime:
                dose.scheduledTime,

            isTaken:
                dose.isTaken,

            canCheckIn:
                !dose.isTaken,

        }));

    }

    private getNextDose(
        treatments: Treatment[],
    ): DoseHistory | undefined {

        const now = new Date();

        return treatments
            .flatMap(treatment => treatment.history)
            .filter(dose =>
                !dose.isTaken &&
                dose.scheduledTime >= now
            )
            .sort(
                (a, b) =>
                    a.scheduledTime.getTime() -
                    b.scheduledTime.getTime()
            )[0];

    }

    private async getRecentHistory(
        patientId: string,
    ) {

        return this.doseHistoryRepository.find({

            where: {

                treatment: {

                    patient: {

                        id: patientId,

                    },

                },

                isTaken: true,

            },

            relations: {

                treatment: {

                    medication: true,

                },

            },

            take: 10,

            order: {

                takenAt: 'DESC',

            },

        });

    }

    private getPatientStatistics(
        agenda: DoseHistory[],
        adherence: AdherenceDto,
        activeTreatments: Treatment[],
    ): PatientStatisticsDto {

        const takenToday =
            agenda.filter(
                dose => dose.isTaken,
            ).length;

        const pendingToday =
            agenda.filter(
                dose => !dose.isTaken,
            ).length;

        return {

            adherencePercentage:
                adherence.percentage,

            activeTreatments:
                activeTreatments.length,

            totalDosesToday:
                agenda.length,

            takenToday,

            pendingToday,

        };

    }

    private getTodayAgendaDto(
        agenda: DoseHistory[],
    ): TodayAgendaDto[] {

        return agenda.map(dose => ({

            doseId: dose.id,

            medication: dose.treatment.medication.name,

            dosage: dose.treatment.medication.strength,

            scheduledTime: dose.scheduledTime,

            isTaken: dose.isTaken,

            canCheckIn: !dose.isTaken,

        }));

    }

    private getRecentHistoryDto(
        history: DoseHistory[],
    ): DoseHistorySummaryDto[] {

        return history.map(dose => ({

            medication:
                dose.treatment.medication.name,

            scheduledTime:
                dose.scheduledTime,

            takenAt:
                dose.takenAt,

        }));

    }

}