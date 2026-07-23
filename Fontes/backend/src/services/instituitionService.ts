import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entidades/Patient';
import { Institution } from 'src/entidades/Institution';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  // Criar uma nova instituição (Geralmente no cadastro do Admin)
  async create(name: string, cnpj: string) {
    const exists = await this.institutionRepository.findOne({ where: { cnpj } });
    if (exists) throw new ConflictException('CNPJ já cadastrado');

    const institution = this.institutionRepository.create({ name, cnpj });
    return this.institutionRepository.save(institution);
  }

  // Listar todos os pacientes de uma clínica específica
  async findAllPatients(institutionId: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: [
        patient: true
      ]
    });

    if (!institution) throw new NotFoundException('Instituição não encontrada');
    return institution.patients;
  }

  // Buscar detalhes de uma instituição
  async findOne(id: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id },
      relations: ['patients', 'admins']
    });
    if (!institution) throw new NotFoundException('Instituição não encontrada');
    return institution;
  }

  // Adicionar um novo paciente à clínica
  async addPatient(institutionId: string, patientData: Partial<Patient>) {
    const institution = await this.findOne(institutionId);
    const patient = this.patientRepository.create({
      ...patientData,
      institution
    });
    return this.patientRepository.save(patient);
  }
}