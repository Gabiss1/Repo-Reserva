import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { DoseHistory } from 'src/entidades/DoseHistory';
import { Treatment } from 'src/entidades/Treatment';
import { CreateTreatmentDto } from 'src/dtos/treatmentsDTO';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(DoseHistory)
    private doseHistoryRepository: Repository<DoseHistory>,
  ) {}

  async create(dto: CreateTreatmentDto): Promise<Treatment> {
    // 1. Criar a instância do tratamento
    const treatment = this.treatmentRepository.create({
      patient: { id: dto.patientId } as any,
      medication: { id: dto.medicationId } as any,
      frequency: dto.frequency,
      intervalHours: dto.intervalHours,
      durationDays: dto.durationDays,
      startDate: new Date(dto.startDate),
    });

    const savedTreatment = await this.treatmentRepository.save(treatment);

    // 2. Gerar histórico de doses automaticamente
    await this.generateDoses(savedTreatment);

    return savedTreatment;
  }

  async checkInDose(doseId: string): Promise<DoseHistory> {
    const dose = await this.doseHistoryRepository.findOne({ 
      where: { id: doseId } 
    });

    if (!dose) {
      throw new NotFoundException('Dose não encontrada');
    }

    if (dose.isTaken) {
      throw new BadRequestException('Esta dose já foi marcada como tomada');
    }

    // Atualiza os campos de confirmação
    dose.isTaken = true;
    dose.takenAt = new Date();

    return this.doseHistoryRepository.save(dose);
  }

  private async generateDoses(treatment: Treatment) {
    const doses: DoseHistory[] = [];
    const totalDoses = (24 / treatment.intervalHours) * treatment.durationDays;
    let nextDoseTime = new Date(treatment.startDate);

    for (let i = 0; i < totalDoses; i++) {
      const dose = this.doseHistoryRepository.create({
        treatment: treatment,
        scheduledTime: new Date(nextDoseTime),
        isTaken: false,
      });
      doses.push(dose);

      // Incrementa o horário para a próxima dose
      nextDoseTime.setHours(nextDoseTime.getHours() + treatment.intervalHours);
    }

    await this.doseHistoryRepository.save(doses);
  }

  // Buscar doses de um dia específico (Hoje)
  async getDailyAgenda(patientId: string, date: Date = new Date()) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.doseHistoryRepository.find({
      where: {
        treatment: { patient: { id: patientId } },
        scheduledTime: Between(startOfDay, endOfDay),
      },
      relations: ['treatment', 'treatment.medication'],
      order: { scheduledTime: 'ASC' },
    });
  }

  // Buscar doses que foram esquecidas (Atrasadas)
  async getMissedDoses(patientId: string) {
    return this.doseHistoryRepository.find({
      where: {
        treatment: { patient: { id: patientId } },
        scheduledTime: LessThan(new Date()),
        isTaken: false,
      },
      relations: ['treatment', 'treatment.medication'],
      order: { scheduledTime: 'DESC' },
    });
  }

  async getPatientAgenda(patientId: string) {
    return this.doseHistoryRepository.find({
      where: { treatment: { patient: { id: patientId } } },
      relations: ['treatment', 'treatment.medication'],
      order: { scheduledTime: 'ASC' },
    });
  }
}