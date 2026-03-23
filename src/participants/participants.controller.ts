// src/participants/participants.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import type { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserRole } from 'generated/prisma/enums';
import type { User } from 'generated/prisma/client';

@Controller('participants')
@UseGuards(AuthGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  // Retorna apenas os participantes da empresa do usuário logado
  @Get('me')
  findMine(@CurrentUser() user: User) {
    if (!user.companyId) {
      throw new ForbiddenException('Usuário não vinculado a nenhuma empresa');
    }
    return this.participantsService.findByCompany(user.companyId);
  }


  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(id);
  }

  @Get('company/:companyId')
  @Roles(UserRole.ADMIN)
  findByCompany(@Param('companyId') companyId: string) {
    return this.participantsService.findByCompany(companyId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
