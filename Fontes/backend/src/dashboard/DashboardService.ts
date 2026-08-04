import {
    Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Institution } from '../entidades/Institution';
import { Patient } from '../entidades/Patient';
import { Treatment } from '../entidades/Treatment';
import { DoseHistory } from '../entidades/DoseHistory';

import { InstitutionDashboardDto } from './dto/InstitutionDashDTO';
import { PatientDashboardDto } from './dto/PatientDashDTO';
import { UserDashboardDto } from './dto/UserDashDTO';

import { PatientsService } from 'src/services/patientsService';
import { ReportsService } from 'src/services/reportsService';
import { TreatmentsService } from 'src/services/treatmentsService';
import { TreatmentSummaryDto } from './dto/TreatmentSummaryDTO';
import { TodayAgendaDto } from './dto/TodayAgendaDTO';
import { InstitutionStatisticsDto } from './dto/InstitutionStatisticsDTO';
import { InstitutionsService } from 'src/services/institutionService';
import { PatientSummaryDto } from './dto/PatientSummaryDTO';
import { UsersService } from 'src/services/usersService';


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
        private readonly usersService: UsersService,

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

    //===========================================================User==============================================================================================

    // Função para gerar os dados do dashboard de um usuário autônomo
    async getUserDashboard(
        userId: string,
    ): Promise<UserDashboardDto> {

        const user =
            await this.usersService.findOne(userId);

        // Busca os tratamentos ativos e informações de adesão do usuário
        const summary =
            await this.buildTreatmentSummary(
                user.cpf,
                user.id,
                'user',
            );

        // Busca a agenda de doses do dia atual
        const agenda =
            await this.treatmentsService.getDailyAgenda(
                user.id,
                'user',
            );

        // Busca a próxima dose pendente do usuário
        const nextDose =
            this.getNextDose(
                summary.treatments,
            );

        return {
            user: {
                id: user.id,
                name: user.name,
                cpf: user.cpf,
                email: user.email,
            },
            adherence:
                summary.adherence,
            nextDose:
                nextDose
                    ? {
                        doseId:
                            nextDose.id,
                        medication:
                            nextDose.treatment.medication.name,
                        scheduledTime:
                            nextDose.scheduledTime,
                    }
                    : undefined,
            activeTreatments:
                summary.treatments.map(treatment =>
                    this.buildTreatmentDto(
                        treatment,
                    )
                ),
            todayAgenda:
                this.buildTodayAgenda(
                    agenda,
                ),
        };
    }

    //===========================================================Institution===================================================================================

    // Função para gerar os dados do dashboard de uma instituição
    async getInstitutionDashboard(
        institutionId: string,
    ): Promise<InstitutionDashboardDto> {

        const institution =
            await this.institutionsService.findOne(
                institutionId,
            );

        // Busca estatísticas gerais da instituição
        const statistics =
            await this.getInstitutionStatistics(
                institutionId,
            );

        // Busca resumo dos pacientes vinculados
        const patients =
            await this.getPatientSummaries(
                institution.patients,
            );

        // Busca a agenda de doses dos pacientes no dia atual
        const todayAgenda =
            await this.getInstitutionTodayAgenda(
                institution.patients,
            );

        return {
            institution: {
                id: institution.id,
                name: institution.name,
                cnpj: institution.cnpj,
            },
            statistics,
            patients,
            todayAgenda,
        };
    }

    // Função para buscar a agenda do dia de todos os pacientes da instituição
    private async getInstitutionTodayAgenda(
        patients: Patient[],
    ): Promise<TodayAgendaDto[]> {

        const agenda: TodayAgendaDto[] = [];

        for (const patient of patients) {

            const patientAgenda =
                await this.treatmentsService.getDailyAgenda(
                    patient.id,
                    'patient',
                );

            const dto =
                this.buildTodayAgenda(patientAgenda);

            // Adiciona informações do paciente em cada dose da agenda
            dto.forEach(item => {
                item.patientId = patient.id;
                item.patientName = patient.name;
            });
            agenda.push(...dto);
        }

        return agenda.sort(
            (a, b) =>
                a.scheduledTime.getTime() -
                b.scheduledTime.getTime(),
        );
    
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

    // Função para calcular estatísticas gerais dos pacientes da instituição
    private async getInstitutionStatistics(
        institutionId: string,
    ): Promise<InstitutionStatisticsDto> {

        const institution =
            await this.institutionsService.findOne(
                institutionId,
            );

        const patientIds =
            institution.patients.map(patient => patient.id);

        let activeTreatments = 0;
        let todayDoses = 0;
        let takenToday = 0;
        let missedToday = 0;

        let totalDoses = 0;
        let totalTaken = 0;

        const today = new Date();

        for (const patientId of patientIds) {

            // Busca agenda diária do paciente
            const agenda =
                await this.treatmentsService.getDailyAgenda(
                    patientId,
                    'patient',
                    today,
                );

            todayDoses += agenda.length;

            takenToday +=
                agenda.filter(dose => dose.isTaken).length;

            missedToday +=
                agenda.filter(
                    dose =>
                        !dose.isTaken &&
                        dose.scheduledTime < new Date(),
                ).length;

            // Busca dados de adesão do paciente
            const adherence =
                await this.reportsService.getAdherence(
                    patientId,
                    'patient',
                );

            totalDoses += adherence.totalDoses;

            totalTaken += adherence.takenDoses;

            // Conta tratamentos ativos do paciente
            const patient =
                await this.patientsService.findOne(patientId);

            activeTreatments +=
                patient.treatments.filter(
                    treatment =>
                        treatment.status === 'ACTIVE',
                ).length;
        }

        return {
            totalPatients:
                institution.patients.length,

            activeTreatments,
            todayDoses,
            takenToday,
            missedToday,
            adherencePercentage:
                totalDoses === 0
                    ? 0
                    : Math.round(
                        (totalTaken / totalDoses) * 100,
                    ),
        };
    }

    // Função para gerar os resumos dos pacientes da instituição
    private async getPatientSummaries(
        patients: Patient[],
    ): Promise<PatientSummaryDto[]> {

        const summaries: PatientSummaryDto[] = [];

        for (const patient of patients) {

            // Busca tratamentos ativos e adesão do paciente
            const summary =
                await this.buildTreatmentSummary(
                    patient.cpf,
                    patient.id,
                    'patient',
                );

            const nextDose =
                this.getNextDose(
                    summary.treatments,
                );

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

    // Função para gerar os dados do dashboard de um paciente
    async getPatientDashboard(
        patientId: string,
    ): Promise<PatientDashboardDto> {

        const patient =
            await this.patientsService.findOne(
                patientId,
            );

        // Busca tratamentos ativos e informações de adesão do paciente
        const summary =
            await this.buildTreatmentSummary(
                patient.cpf,
                patient.id,
                'patient',
            );

        // Busca próxima dose pendente
        const nextDose =
            this.getNextDose(
                summary.treatments,
            );

        // Busca agenda de doses do dia
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
                institution:
                    patient.institution?.name,
            },

            adherence:
                summary.adherence,

            nextDose:
                nextDose
                    ? {
                        doseId:
                            nextDose.id,

                        medication:
                            nextDose.treatment.medication.name,

                        scheduledTime:
                            nextDose.scheduledTime,
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

    // Função para montar o resumo dos tratamentos e adesão de um perfil
    private async buildTreatmentSummary(
        cpf: string,
        ownerId: string,
        type: 'user' | 'patient',
    ) {

        // Busca tratamentos ativos vinculados ao usuário ou paciente
        const treatments =
            await this.treatmentsService.findAllByCpf(
                cpf,
                type,
                'ACTIVE',
            );

        // Busca informações de adesão do tratamento
        const adherence =
            await this.reportsService.getAdherence(
                ownerId,
                type,
            );

        return {
            treatments,
            adherence,
            nextDose:
                this.getNextDose(
                    treatments,
                ),
        };
    }

    // Função para converter tratamento em formato de resumo para o dashboard
    private buildTreatmentDto(
        treatment: Treatment,
    ): TreatmentSummaryDto {

        const nextDose =
            this.getNextDose(
                [treatment],
            );

        return {

            id:
                treatment.id,

            medicationId:
                treatment.medication.id,

            medication:
                treatment.medication.name,

            dosage:
                treatment.medication.strength,

            dosageForm:
                treatment.medication.dosageForm,

            intervalHours:
                treatment.intervalHours,

            durationDays:
                treatment.durationDays,

            startDate:
                treatment.startDate,

            status:
                treatment.status,

            nextDose:
                nextDose?.scheduledTime,
        };
    }

    // Função para formatar a agenda diária de doses
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

    // Função para buscar a próxima dose pendente de um tratamento
    private getNextDose(
        treatments: Treatment[],
    ): DoseHistory | undefined {

        const now = new Date();

        return treatments
            .flatMap(treatment => treatment.history)
            .filter(dose =>
                !dose.isTaken &&
                dose.scheduledTime >= now,
            )
            .sort(
                (a, b) =>
                    a.scheduledTime.getTime() -
                    b.scheduledTime.getTime(),
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