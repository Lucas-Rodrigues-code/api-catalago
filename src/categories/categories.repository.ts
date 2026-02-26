import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Categories } from './entities/categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Categories[]> {
    return this.prisma.categories.findMany() as Promise<Categories[]>;
  }

  async findOne(id: string): Promise<Categories | null> {
    return this.prisma.categories.findUnique({
      where: { id },
    }) as Promise<Categories | null>;
  }

  async findVideosByCategory(categoryId: string): Promise<any[]> {
    return this.prisma.videoCategory.findMany({
      where: {
        category_id: categoryId,
      },
      include: {
        video: true,
      },
    });
  }
}
