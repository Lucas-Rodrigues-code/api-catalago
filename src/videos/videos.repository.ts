import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Video[]> {
    return this.prisma.video.findMany() as Promise<Video[]>;
  }

  async findOne(id: string): Promise<Video | null> {
    return this.prisma.video.findUnique({
      where: { id },
    }) as Promise<Video | null>;
  }

  async findRelated(id: string, limit: number = 5): Promise<Video[]> {
    const video = await this.prisma.video.findUnique({
      where: { id },
      include: {
        videoCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!video) {
      return [];
    }

    const categoryIds = video.videoCategories.map((vc) => vc.category_id);

    if (categoryIds.length === 0) {
      return [];
    }

    return this.prisma.video.findMany({
      where: {
        id: { not: id },
        videoCategories: {
          some: {
            category_id: {
              in: categoryIds,
            },
          },
        },
      },
      take: limit,
    }) as Promise<Video[]>;
  }
}
