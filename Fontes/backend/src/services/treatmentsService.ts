import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { Treatment } from 'src/entidades/Treatment';
import { DoseHistory } from 'src/entidades/DoseHistory';
import { Patient } from 'src/entidades/Patient';
import { User } from 'src/entidades/User';
import { CreateTreatmentDto } from '../dtos/treatmentsDTO';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(DoseHistory)
    private doseHistoryRepository: Repository<DoseHistory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(dto: CreateTreatmentDto) {
    let owner: { user?: User; patient?: Patient } = {};

    // Se o usuário passar CPF, buscamos quem é o dono do tratamento
    if (dto.userCpf) {
      const user = await this.userRepository.findOne({ where: { cpf: dto.userCpf } });
      if (!user) throw new NotFoundException('Usuário autônomo não encontrado com este CPF');
      owner.user = user;
    } else if (dto.patientCpf) {
      const patient = await this.patientRepository.findOne({ where: { cpf: dto.patientCpf } });
      if (!patient) throw new NotFoundException('Paciente da clínica não encontrado com este CPF');
      owner.patient = patient;
    }

    const treatment = this.treatmentRepository.create({
      intervalHours: dto.intervalHours,
      durationDays: dto.durationDays,
      startDate: new Date(dto.startDate),
      medication: { id: dto.medicationId },
      // Vinculamos o objeto completo ou apenas a referência
      user: owner.user,
      patient: owner.patient
    });

    const saved = await this.treatmentRepository.save(treatment);
    await this.generateDoses(saved);
    return saved;
  }

  async checkInDose(doseId: string): Promise<DoseHistory> {
    const dose = await this.doseHistoryRepository.findOne({ 
      where: { id: doseId },
      relations: {
        treatment: true
      }
    });

    if (!dose) throw new NotFoundException('Dose não encontrada');
    if (dose.isTaken) throw new BadRequestException('Esta dose já foi marcada como tomada');

    dose.isTaken = true;
    dose.takenAt = new Date();

    return this.doseHistoryRepository.save(dose);
  }

  private async generateDoses(treatment: Treatment) {
    const doses: DoseHistory[] = [];
    // Cálculo de doses baseado na duração e intervalo
    const totalDoses = (24 / treatment.intervalHours) * treatment.durationDays;
    let nextDoseTime = new Date(treatment.startDate);

    for (let i = 0; i < totalDoses; i++) {
      const dose = this.doseHistoryRepository.create({
        treatment: treatment,
        scheduledTime: new Date(nextDoseTime),
        isTaken: false,
      });
      doses.push(dose);
      nextDoseTime.setHours(nextDoseTime.getHours() + treatment.intervalHours);
    }
  }

  // Busca tratamentos baseada no CPF (Flexibilidade para o front)
  async findAllByCpf(cpf: string, type: 'user' | 'patient') {
    const whereCondition = type === 'user' ? { user: { cpf } } : { patient: { cpf } };
    
    return this.treatmentRepository.find({
      where: whereCondition,
      relations: {
        medication: true,
        history: true
      }
    });
  }
}