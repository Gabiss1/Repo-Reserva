import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entidades/Category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(name: string, description?: string) {
    const exists = await this.categoryRepository.findOne({ where: { name } });
    if (exists) throw new ConflictException('Esta categoria já existe');

    const category = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(category);
  }

  async findAll() {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ 
      where: { id },
      relations: {
        medications: true
      } 
    });
    if (!category) throw new NotFoundException('Categoria não encontrada');
    return category;
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    return this.categoryRepository.remove(category);
  }
}