import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Video[]> {
    return this.prisma.video.findMany() as Promise<Video[]>;
  }
}
