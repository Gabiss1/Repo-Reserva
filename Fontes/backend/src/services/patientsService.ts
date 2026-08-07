import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Patient } from "src/entidades/Patient";
import { UpdatePatientDto } from "src/dashboard/dto/update/UpdatePatientDTO";

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>
  ) {}

  // Função para buscar todos os pacientes cadastrados
  async findAll() {
    return this.patientRepository.find({
      relations: {
        institution: true,
      },
      order: { name: "ASC" },
    });
  }

  // Função para buscar um paciente por meio do ID
  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: {
        institution: true,
        treatments: {
          medication: true,
        },
      },
    });

    if (!patient) throw new NotFoundException("Paciente não encontrado");

    return patient;
  }

  // Função para buscar um paciente por meio do CPF
  async findByCpf(cpf: string) {
    const patient = await this.patientRepository.findOne({
      where: { cpf },
      relations: {
        institution: true,
      },
    });

    if (!patient)
      throw new NotFoundException("Paciente não encontrado com este CPF");

    return patient;
  }

  // Função para remover um paciente por meio do CPF
  async remove(cpf: string) {
    const patient = await this.patientRepository.findOne({
      where: { cpf },
      relations: {
        institution: true,
      },
    });

    if (!patient)
      throw new NotFoundException("Paciente não encontrado com este CPF");

    return this.patientRepository.remove(patient);
  }

  async update(id: string, data: UpdatePatientDto) {
    const patient = await this.findOne(id);

    Object.assign(patient, data);

    return this.patientRepository.save(patient);
  }
}
