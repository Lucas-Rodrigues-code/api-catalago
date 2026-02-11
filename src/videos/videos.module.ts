import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideoRepository } from './videos.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VideosController],
  providers: [VideosService, VideoRepository],
})
export class VideosModule {}
