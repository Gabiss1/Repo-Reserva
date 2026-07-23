import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from 'src/entidades/Institution';
import { Patient } from 'src/entidades/Patient';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) { }

  async create(name: string, cnpj: string) {
    const exists = await this.institutionRepository.findOne({ where: { cnpj } });
    if (exists) throw new ConflictException('CNPJ já cadastrado');

    const institution = this.institutionRepository.create({ name, cnpj });
    return this.institutionRepository.save(institution);
  }

  async findAllPatients(institutionId: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: {
        patients: true
      }
    });

    if (!institution) throw new NotFoundException('Instituição não encontrada');
    return institution.patients;
  }

  async addPatient(institutionId: string, patientData: Partial<Patient>) {
    const institution = await this.institutionRepository.findOne({ where: { id: institutionId } });
    if (!institution) throw new NotFoundException('Instituição não encontrada');

    const patient = this.patientRepository.create({
      ...patientData,
      institution
    });
    return this.patientRepository.save(patient);
  }

  async findOne(id: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id },
      relations: {
        patients: true
      }
    });
    if (!institution) throw new NotFoundException('Instituição não encontrada');
    return institution;
  }
}