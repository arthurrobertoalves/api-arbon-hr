// src/evaluation/evaluation.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateEvaluationDto } from './dto/create-evaluation.dto'

const SELECT = {
  id: true,
  participantId: true,
  leadershipScore: true,
  decisionScore: true,
  communicationScore: true,
  adaptabilityScore: true,
  pressureScore: true,
  overallScore: true,
  strengths: true,
  risks: true,
  observations: true,
  recommendation: true,
  createdAt: true,
  updatedAt: true,
  participant: {
    select: {
      id: true,
      name: true,
      companyId: true,
      immersionId: true,
    },
  },
}

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEvaluationDto) {
    const participant = await this.prisma.participant.findUnique({
      where: { id: dto.participantId },
    })
    if (!participant) throw new NotFoundException('Participante não encontrado')

    const existing = await this.prisma.evaluation.findUnique({
      where: { participantId: dto.participantId },
    })
    if (existing) throw new ConflictException('Participante já possui avaliação')

    return this.prisma.evaluation.create({
      data: { ...dto },
      select: SELECT,
    })
  }

  async findByParticipant(participantId: string) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { participantId },
      select: SELECT,
    })

    if (!evaluation) throw new NotFoundException('Avaliação não encontrada')

    return evaluation
  }

  async findByImmersion(immersionId: string) {
    return this.prisma.evaluation.findMany({
      where: {
        participant: { immersionId },
      },
      select: SELECT,
      orderBy: { overallScore: 'desc' },
    })
  }

  async update(participantId: string, dto: Partial<CreateEvaluationDto>) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { participantId },
    })
    if (!evaluation) throw new NotFoundException('Avaliação não encontrada')

    return this.prisma.evaluation.update({
      where: { participantId },
      data: { ...dto },
      select: SELECT,
    })
  }
}