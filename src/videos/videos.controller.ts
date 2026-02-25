import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Video> {
    const video = await this.videosService.findOne(id);

    if (!video) {
      throw new NotFoundException(`Vídeo com ID ${id} não encontrado`);
    }

    return video;
  }

  @Get(':id/related')
  findRelated(@Param('id', new ParseUUIDPipe()) id: string): Promise<Video[]> {
    return this.videosService.findRelated(id);
  }
}
