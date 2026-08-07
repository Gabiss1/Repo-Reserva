import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TreatmentsService } from "./treatmentsService";
import { Institution } from "src/entidades/Institution";
import { Patient } from "src/entidades/Patient";

import * as bcrypt from "bcrypt";
import { CreateInstitutionDto } from "src/dashboard/dto/create/CreateInstitutionDTO";

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private readonly treatmentsService: TreatmentsService
  ) {}

  // Função para criar instituição com nome e cnpj
  async create(dto: CreateInstitutionDto) {
    const { name, cnpj, email, password } = dto;

    const cnpjExists = await this.institutionRepository.findOne({
      where: {
        cnpj,
      },
    });

    if (cnpjExists) {
      throw new ConflictException("CNPJ já cadastrado");
    }

    const emailExists = await this.institutionRepository.findOne({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new ConflictException("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const institution = this.institutionRepository.create({
      name,
      cnpj,
      email,
      password: hashedPassword,
    });

    return this.institutionRepository.save(institution);
  }

  // Função para buscar todos os pacientes dentro de uma instituição
  async findAllPatients(institutionId: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: {
        patients: true,
      },
    });

    if (!institution) throw new NotFoundException("Instituição não encontrada");
    return institution.patients;
  }

  // Função para adicionar paciente dentro de uma instituição
  async addPatient(institutionId: string, patientData: Partial<Patient>) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
    });
    if (!institution) throw new NotFoundException("Instituição não encontrada");

    const patient = this.patientRepository.create({
      ...patientData,
      institution,
    });
    return this.patientRepository.save(patient);
  }

  // Função para adicionar tratamento a paciente
  async addTreatmentToPatient(
    institutionId: string,
    patientCpf: string,
    treatmentData: any
  ) {
    // 1. Validar se a instituição existe
    const institution = await this.findOne(institutionId);

    // 2. Validar se o paciente pertence a esta instituição
    const patient = await this.patientRepository.findOne({
      where: {
        cpf: patientCpf,
        institution: { id: institutionId },
      },
    });

    if (!patient)
      throw new NotFoundException("Paciente não encontrado nesta instituição");

    // 3. Delegar a criação para o TreatmentsService (que gera as doses)
    return this.treatmentsService.create({
      ...treatmentData,
      patientCpf: patient.cpf,
    });
  }

  // Função para buscar instituição por meio de ID
  async findOne(id: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id },
      relations: {
        patients: true,
      },
    });
    if (!institution) throw new NotFoundException("Instituição não encontrada");
    return institution;
  }

  async findByEmail(email: string): Promise<Institution | null> {
    return this.institutionRepository
      .createQueryBuilder("institution")
      .addSelect("institution.password")
      .where("institution.email = :email", {
        email,
      })
      .getOne();
  }

  async update(id: string, data: Partial<Institution>) {
    const institution = await this.findOne(id);

    delete data.password;

    Object.assign(institution, data);

    return this.institutionRepository.save(institution);
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const institution = await this.institutionRepository
      .createQueryBuilder("institution")
      .addSelect("institution.password")
      .where("institution.id = :id", { id })
      .getOne();

    if (!institution) {
      throw new NotFoundException("Instituição não encontrada");
    }

    const valid = await bcrypt.compare(oldPassword, institution.password);

    if (!valid) {
      throw new ConflictException("Senha atual incorreta");
    }

    institution.password = await bcrypt.hash(newPassword, 10);

    return this.institutionRepository.save(institution);
  }

  async findByCnpj(cnpj: string): Promise<Institution | null> {
    return this.institutionRepository
      .createQueryBuilder("institution")
      .addSelect("institution.password")
      .where("institution.cnpj = :cnpj", {
        cnpj,
      })
      .getOne();
  }
}
