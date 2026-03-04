import { Module } from '@nestjs/common';
import { CastMembersController } from './cast-members.controller';
import { CastMembersService } from './cast-members.service';
import { CastMembersRepository } from './cast-members.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CastMembersController],
  providers: [CastMembersService, CastMembersRepository],
})
export class CastMembersModule {}
