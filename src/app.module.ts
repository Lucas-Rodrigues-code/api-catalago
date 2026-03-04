import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { CategoriesModule } from './categories/categories.module';
import { CastMembersModule } from './cast-members/cast-members.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, VideosModule, CategoriesModule, CastMembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
