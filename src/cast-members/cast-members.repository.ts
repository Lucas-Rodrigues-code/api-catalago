import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CastMembers } from './entities/cast_member.entity';

@Injectable()
export class CastMembersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CastMembers[]> {
    return this.prisma.castMembers.findMany() as Promise<CastMembers[]>;
  }

  async findOne(id: string): Promise<CastMembers | null> {
    return this.prisma.castMembers.findUnique({
      where: { id },
    }) as Promise<CastMembers | null>;
  }

  async findVideosByCastMember(castMemberId: string): Promise<any[]> {
    return this.prisma.videoCastMember.findMany({
      where: {
        cast_member_id: castMemberId,
      },
      include: {
        video: true,
      },
    });
  }
}
