import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Medication } from "src/entidades/Medication";
import { Category } from "src/entidades/Category";
import { CreateMedicationDTO } from "src/dashboard/dto/create/CreateMedicationDTO";
import { UpdateMedicationDTO } from "src/dashboard/dto/update/UpdateMedicationDTO";

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Função para cadastrar um novo medicamento
  async create(dto: CreateMedicationDTO): Promise<Medication> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: dto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException("Categoria não encontrada");
    }

    const medication = this.medicationRepository.create({
      name: dto.name,

      dosage: dto.dosage,

      pharmaceuticalForm: dto.pharmaceuticalForm,

      category,
    });

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

  async update(id: string, dto: UpdateMedicationDTO) {
    const medication = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: dto.categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException("Categoria não encontrada");
      }

      medication.category = category;
    }

    if (dto.name) {
      medication.name = dto.name;
    }

    if (dto.dosage) {
      medication.dosage = dto.dosage;
    }

    if (dto.pharmaceuticalForm) {
      medication.pharmaceuticalForm = dto.pharmaceuticalForm;
    }

    return this.medicationRepository.save(medication);
  }
}
