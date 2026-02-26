import { Injectable } from '@nestjs/common';
import { Categories } from './entities/categories.entity';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async findAll(): Promise<Categories[]> {
    return this.categoriesRepository.findAll();
  }

  async findOne(id: string): Promise<Categories | null> {
    return this.categoriesRepository.findOne(id);
  }

  async findVideosByCategory(categoryId: string): Promise<any[]> {
    const videoCategories =
      await this.categoriesRepository.findVideosByCategory(categoryId);
    return videoCategories.map((vc) => vc.video);
  }
}
