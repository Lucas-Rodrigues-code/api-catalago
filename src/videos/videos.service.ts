import { Injectable } from '@nestjs/common';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  findAll(): Video[] {
    // Mock data - substitua pela busca real do banco de dados
    return [
      {
        id: '1',
        title: 'Vídeo de Exemplo 1',
        description: 'Descrição do vídeo 1',
        duration_seconds: 120,
        release_year: 2024,
        status: 'available',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        title: 'Vídeo de Exemplo 2',
        description: 'Descrição do vídeo 2',
        duration_seconds: 120,
        release_year: 2024,
        status: 'available',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
  }
}
