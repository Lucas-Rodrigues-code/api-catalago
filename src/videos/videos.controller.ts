import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { FindAllVideosDto } from './dto/find-all-videos.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll(@Query() query: FindAllVideosDto): Promise<Video[]> {
    const page = Math.max(query.page ?? 1, 1);
    const per_page = Math.max(query.per_page ?? 20, 1);
    const sort_field = query.sort || 'created_at';
    const order: 'asc' | 'desc' = query.order === 'asc' ? 'asc' : 'desc';

    const format_query: FindAllVideosDto = {
      ...query,
      page,
      per_page,
      sort: sort_field,
      order,
    };

    return this.videosService.findAll(format_query);
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
