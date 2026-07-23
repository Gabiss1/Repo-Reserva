import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { Treatment } from '../entidades/Treatment';
import { DoseHistory } from '../entidades/DoseHistory';
import { User } from '../entidades/User';
import { Patient } from '../entidades/Patient';
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

  /**
   * Cria um novo tratamento vinculando-o a um Usuário ou Paciente via CPF.
   */
  async create(dto: CreateTreatmentDto) {
    let owner: { user?: User; patient?: Patient } = {};

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
      user: owner.user,
      patient: owner.patient
    });

    const saved = await this.treatmentRepository.save(treatment);
    await this.generateDoses(saved);
    return saved;
  }

  /**
   * Gera o histórico de doses e persiste no banco de dados.
   */
  private async generateDoses(treatment: Treatment) {
    const doses: DoseHistory[] = [];
    const totalDoses = Math.floor((24 / treatment.intervalHours) * treatment.durationDays);
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
    
    await this.doseHistoryRepository.save(doses);
  }

  /**
   * Retorna a agenda completa de um período (ou dia específico).
   */
  async getDailyAgenda(id: string, type: 'user' | 'patient', date: Date = new Date()) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const whereCondition = type === 'user' 
      ? { treatment: { user: { id } } } 
      : { treatment: { patient: { id } } };

    return this.doseHistoryRepository.find({
      where: {
        ...whereCondition,
        scheduledTime: Between(startOfDay, endOfDay),
      },
      relations: {
        treatment: { medication: true },
      },
      order: { scheduledTime: 'ASC' },
    });
  }

  /**
   * Retorna doses atrasadas (agendadas no passado e não tomadas).
   */
  async getMissedDoses(id: string, type: 'user' | 'patient') {
    const whereCondition = type === 'user' 
      ? { treatment: { user: { id } } } 
      : { treatment: { patient: { id } } };

    return this.doseHistoryRepository.find({
      where: {
        ...whereCondition,
        scheduledTime: LessThan(new Date()),
        isTaken: false,
      },
      relations: {
        treatment: { medication: true },
      },
      order: { scheduledTime: 'DESC' },
    });
  }

  /**
   * Realiza o check-in de uma dose.
   */
  async checkInDose(doseId: string): Promise<DoseHistory> {
    const dose = await this.doseHistoryRepository.findOne({
      where: { id: doseId },
      relations: { treatment: true }
    });

    if (!dose) throw new NotFoundException('Dose não encontrada');
    if (dose.isTaken) throw new BadRequestException('Esta dose já foi marcada como tomada');

    dose.isTaken = true;
    dose.takenAt = new Date();

    return this.doseHistoryRepository.save(dose);
  }

  /**
   * Lista todos os tratamentos de um dono via CPF.
   */
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

