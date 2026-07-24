import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Medication } from 'src/entidades/Medication';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  /**
   * Cadastra um novo medicamento no catálogo.
   */
  async create(data: Partial<Medication>): Promise<Medication> {
    const medication = this.medicationRepository.create(data);
    return this.medicationRepository.save(medication);
  }

  /**
   * Lista todos os medicamentos em ordem alfabética.
   */
  async findAll() {
    return this.medicationRepository.find({
      relations: {
        category: true,
      },
      order: { name: 'ASC' },
    });
  }

  /**
   * Busca medicamentos por nome (Autocomplete).
   */
  async search(term: string) {
    return this.medicationRepository.find({
      where: { name: Like(`%${term}%`) },
      relations: {
        category: true,
      },
      take: 10,
      order: { name: 'ASC' }
    });
  }

  /**
   * Detalhes de um medicamento específico.
   */
  async findOne(id: string) {
    const medication = await this.medicationRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    if (!medication) throw new NotFoundException('Medicamento não encontrado');
    return medication;
  }

  /**
   * Remove um item do catálogo.
   */
  async remove(id: string) {
    const medication = await this.findOne(id);
    return this.medicationRepository.remove(medication);
  }
}