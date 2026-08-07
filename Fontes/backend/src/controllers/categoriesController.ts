import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dashboard/dto/create/CreateCategoryDTO';
import { UpdateCategoryDto } from 'src/dashboard/dto/update/UpdateCategoryDTO';
import { CategoriesService } from 'src/services/categoriesService';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  // Create de categorias
  @Post()
  create(
    @Body()
    dto: CreateCategoryDto,
  ) {

    return this.categoriesService.create(dto);

  }

  // Read de categorias para listar todas
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // Read com especificação de id para filtragem especifica de Categoria
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  // Delete de categorias por meio de ID
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe)
    id: string,

    @Body()
    dto: UpdateCategoryDto,
  ) {

    return this.categoriesService.update(
      id,
      dto,
    );

  }
}