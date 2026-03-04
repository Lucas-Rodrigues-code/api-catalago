import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CastMembersService } from './cast-members.service';
import { CastMembers } from './entities/cast_member.entity';

@Controller('cast-members')
export class CastMembersController {
  constructor(private readonly castMembersService: CastMembersService) {}

  @Get()
  findAll(): Promise<CastMembers[]> {
    return this.castMembersService.findAll();
  }

  @Get(':id/videos')
  async findVideosByCastMember(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<any[]> {
    return this.castMembersService.findVideosByCastMember(id);
  }
}
