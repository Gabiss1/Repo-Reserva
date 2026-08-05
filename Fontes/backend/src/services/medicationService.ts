import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Medication } from "src/entidades/Medication";

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>
  ) {}

  // Função para cadastrar um novo medicamento
  async create(data: Partial<Medication>): Promise<Medication> {
    const medication = this.medicationRepository.create(data);
    return this.medicationRepository.save(medication);
  }

  // Função para buscar todos os medicamentos cadastrados
  async findAll() {
    return this.medicationRepository.find({
      relations: {
        category: true,
      },
      order: { name: "ASC" },
    });
  }

  // Função para pesquisar medicamentos pelo nome
  async search(term: string) {
    return this.medicationRepository.find({
      where: { name: Like(`%${term}%`) },
      relations: {
        category: true,
      },
      take: 10,
      order: { name: "ASC" },
    });
  }

  // Função para buscar um medicamento por meio do ID
  async findOne(id: string) {
    const medication = await this.medicationRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!medication) throw new NotFoundException("Medicamento não encontrado");

    return medication;
  }

  // Função para remover um medicamento
  async remove(id: string) {
    const medication = await this.findOne(id);
    return this.medicationRepository.remove(medication);
  }

  async update(id: string, data: Partial<Medication>) {
    const medication = await this.findOne(id);

    Object.assign(medication, data);

    return this.medicationRepository.save(medication);
  }
}
