import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
