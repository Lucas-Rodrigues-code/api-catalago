import { Injectable } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { VideoRepository } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(private videoRepository: VideoRepository) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.findAll();
  }
}
