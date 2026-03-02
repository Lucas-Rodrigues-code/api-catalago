import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Video } from './entities/video.entity';
import { FindAllVideosDto } from './dto/find-all-videos.dto';

@Injectable()
export class VideoRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query: FindAllVideosDto): Promise<Video[]> {
    const where: any = {};
    if (query.year !== undefined) {
      where.release_year = query.year;
    }

    if (query.category_id) {
      where.videoCategories = {
        some: { category_id: query.category_id },
      };
    }

    if (query.genre_id) {
      where.videoCategories = where.videoCategories || {};
    }

    return this.prisma.video.findMany({
      where,
      skip: (query.page - 1) * query.per_page,
      take: query.per_page,
      orderBy: { [query.sort]: query.order },
    }) as Promise<Video[]>;
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
