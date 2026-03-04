import { Injectable, NotFoundException } from '@nestjs/common';
import { CastMembers } from './entities/cast_member.entity';
import { CastMembersRepository } from './cast-members.repository';

@Injectable()
export class CastMembersService {
  constructor(private castMembersRepository: CastMembersRepository) {}

  async findAll(): Promise<CastMembers[]> {
    return this.castMembersRepository.findAll();
  }

  async findOne(id: string): Promise<CastMembers | null> {
    return this.castMembersRepository.findOne(id);
  }

  async findVideosByCastMember(castMemberId: string): Promise<any[]> {
    const castMember = await this.findOne(castMemberId);

    if (!castMember) {
      throw new NotFoundException(
        `Membro do elenco com ID ${castMemberId} não encontrado`,
      );
    }
    const videoCastMembers =
      await this.castMembersRepository.findVideosByCastMember(castMemberId);
    return videoCastMembers.map((vcm) => vcm.video);
  }
}
