import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id/videos')
  async findVideosByCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<any[]> {
    const category = await this.categoriesService.findOne(id);

    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }

    return this.categoriesService.findVideosByCategory(id);
  }
}
