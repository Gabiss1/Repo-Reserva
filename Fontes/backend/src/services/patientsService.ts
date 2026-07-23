import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entidades/Patient';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  /**
   * Lista todos os pacientes cadastrados no sistema.
   */
  async findAll() {
    return this.patientRepository.find({
      relations: {
        institution: true,
      },
      order: { name: 'ASC' },
    });
  }

  /**
   * Busca um paciente específico pelo ID interno.
   */
  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: {
        institution: true,
        treatments: {
          medication: true
        }
      },
    });
    if (!patient) throw new NotFoundException('Paciente não encontrado');
    return patient;
  }

  /**
   * Busca um paciente pelo CPF.
   */
  async findByCpf(cpf: string) {
    const patient = await this.patientRepository.findOne({
      where: { cpf },
      relations: {
        institution: true
      }
    });
    if (!patient) throw new NotFoundException('Paciente não encontrado com este CPF');
    return patient;
  }

  /**
   * Remove o registro de um paciente.
   */
  async remove(cpf: string) {
    const patient = await this.patientRepository.findOne({
      where: { cpf },
      relations: {
        institution: true
      }
    });
    if (!patient) throw new NotFoundException('Paciente não encontrado com este CPF');
    return this.patientRepository.remove(patient);
  }
}