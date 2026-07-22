import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DoseHistory } from '../entidades/DoseHistory';
import { Treatment } from '../entidades/Treatment';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(DoseHistory)
    private doseHistoryRepository: Repository<DoseHistory>,
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
  ) {}

  // Calcula a adesão geral de um paciente (% de doses tomadas vs total agendado)
  async getPatientAdherence(patientId: string) {
    const [doses, total] = await this.doseHistoryRepository.findAndCount({
      where: { treatment: { patient: { id: patientId } } },
    });

    if (total === 0) return { percentage: 0, totalDoses: 0, takenDoses: 0 };

    const takenDoses = doses.filter(d => d.isTaken).length;
    const percentage = Math.round((takenDoses / total) * 100);

    return {
      percentage,
      totalDoses: total,
      takenDoses,
      missedDoses: total - takenDoses,
    };
  }

  // Resumo semanal para o Dashboard da Clínica
  async getWeeklySummary(institutionId: string) {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    // Busca todas as doses da instituição na última semana
    const doses = await this.doseHistoryRepository.find({
      where: {
        treatment: { patient: { institution: { id: institutionId } } },
        scheduledTime: Between(lastWeek, today),
      },
      relations: ['treatment', 'treatment.patient'],
    });

    const total = doses.length;
    const taken = doses.filter(d => d.isTaken).length;
    
    return {
      period: 'Últimos 7 dias',
      totalDosesTracked: total,
      overallAdherence: total > 0 ? Math.round((taken / total) * 100) : 0,
      activePatients: new Set(doses.map(d => d.treatment.patient.id)).size,
    };
  }
}