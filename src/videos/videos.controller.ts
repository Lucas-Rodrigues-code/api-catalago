import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }
}
