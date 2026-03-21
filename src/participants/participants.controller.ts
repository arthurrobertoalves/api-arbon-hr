import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import type { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('participants')
@UseGuards(AuthGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
