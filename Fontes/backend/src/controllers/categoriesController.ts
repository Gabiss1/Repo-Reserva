import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from 'src/services/categoriesService';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create de categorias
  @Post()
  create(@Body() dto: { name: string; description?: string }) {
    return this.categoriesService.create(dto.name, dto.description);
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
}