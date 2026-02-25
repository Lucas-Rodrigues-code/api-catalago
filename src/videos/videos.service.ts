import { Injectable } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { VideoRepository } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(private videoRepository: VideoRepository) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.findAll();
  }

  async findOne(id: string): Promise<Video | null> {
    console.log(`Buscando vídeo com ID: ${id}`);
    return this.videoRepository.findOne(id);
  }

  async findRelated(id: string): Promise<Video[]> {
    return this.videoRepository.findRelated(id);
  }
}
