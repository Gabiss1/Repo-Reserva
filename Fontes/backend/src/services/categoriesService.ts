import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entidades/Category';
import { CreateCategoryDto } from 'src/dashboard/dto/create/CreateCategoryDTO';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  // Função para criar nova categoria com nome e descrição
  async create(
    dto: CreateCategoryDto,
  ) {

    const exists =
      await this.categoryRepository.findOne({

        where: {
          name: dto.name,
        },

      });

    if (exists) {

      throw new ConflictException(
        "Esta categoria já existe",
      );

    }

    const category =
      this.categoryRepository.create(dto);

    return this.categoryRepository.save(
      category,
    );

  }

  // Função para buscar todos em ondem crescente por meio de nome da Categoria
  async findAll() {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  // Função para buscar categoria especifica por meio de ID
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

  // Função para deletar categoria por meio de ID
  async remove(id: string) {
    const category = await this.findOne(id);
    return this.categoryRepository.remove(category);
  }

  async update(
    id: string,
    data: Partial<Category>,
  ) {

    const category =
      await this.findOne(id);

    if (
      data.name &&
      data.name !== category.name
    ) {

      const exists =
        await this.categoryRepository.findOne({

          where: {
            name: data.name,
          },

        });

      if (exists) {

        throw new ConflictException(
          "Esta categoria já existe",
        );

      }

    }

    Object.assign(
      category,
      data,
    );

    return this.categoryRepository.save(
      category,
    );

  }
}