// src/evaluation/evaluation.controller.ts

import {
  Controller, Get, Post, Patch,
  Body, Param, UseGuards,
} from '@nestjs/common'
import { EvaluationService } from './evaluation.service'
import { CreateEvaluationDto } from './dto/create-evaluation.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'generated/prisma/enums'

@Controller('evaluations')
@UseGuards(AuthGuard, RolesGuard)
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationService.create(dto)
  }

  // Busca avaliação de um participante específico
  @Get('participant/:participantId')
  findByParticipant(@Param('participantId') participantId: string) {
    return this.evaluationService.findByParticipant(participantId)
  }

  // Busca todas avaliações de uma imersão (ranking)
  @Get('immersion/:immersionId')
  findByImmersion(@Param('immersionId') immersionId: string) {
    return this.evaluationService.findByImmersion(immersionId)
  }

  // Atualiza avaliação pelo participantId
  @Patch('participant/:participantId')
  @Roles(UserRole.ADMIN)
  update(
    @Param('participantId') participantId: string,
    @Body() dto: Partial<CreateEvaluationDto>,
  ) {
    return this.evaluationService.update(participantId, dto)
  }
}