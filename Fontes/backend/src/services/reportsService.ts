import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DoseHistory } from 'src/entidades/DoseHistory';
import { Treatment } from 'src/entidades/Treatment';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(DoseHistory)
    private doseHistoryRepository: Repository<DoseHistory>,
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
  ) {}

  // Calcula a adesão de um paciente específico gerido por clínica
  async getPatientAdherence(patientId: string) {
    const [doses, total] = await this.doseHistoryRepository.findAndCount({
      where: { 
        treatment: { 
          patient: { id: patientId } 
        } 
      },
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

  // Resumo para o Dashboard da Instituição (Todos os pacientes da clínica)
  async getInstitutionSummary(institutionId: string) {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    // Busca todas as doses dos pacientes desta instituição nos últimos 7 dias
    const doses = await this.doseHistoryRepository.find({
      where: {
        treatment: { 
          patient: { institution: { id: institutionId } } 
        },
        scheduledTime: Between(lastWeek, today),
      },
      relations: {
        treatment: {
          patient: true,
          medication: true
        }
      },
    });

    const total = doses.length;
    const taken = doses.filter(d => d.isTaken).length;
    
    // Lista de pacientes únicos que tiveram doses agendadas na semana
    const activePatientsCount = new Set(doses.map(d => d.treatment.patient.id)).size;

    return {
      period: 'Últimos 7 dias',
      totalDosesTracked: total,
      overallAdherence: total > 0 ? Math.round((taken / total) * 100) : 0,
      activePatients: activePatientsCount,
      summaryByPatient: this.groupByPatient(doses)
    };
  }

  private groupByPatient(doses: DoseHistory[]) {
    const summary: Record<string, any> = {};

    doses.forEach(dose => {
      const patientName = dose.treatment.patient.name;
      if (!summary[patientName]) {
        summary[patientName] = { total: 0, taken: 0 };
      }
      summary[patientName].total++;
      if (dose.isTaken) summary[patientName].taken++;
    });

    return Object.entries(summary).map(([name, stats]) => ({
      name,
      adherence: Math.round((stats.taken / stats.total) * 100)
    }));
  }
}