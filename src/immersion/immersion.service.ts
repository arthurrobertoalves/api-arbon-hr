import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateImmersionDto } from './dto/create-immersion.dto'
import { ImmersionStatus } from 'generated/prisma/enums'

const LIST_SELECT = {
  id: true,
  name: true,
  status: true,
  companyId: true,
  createdAt: true,
  company: {
    select: { id: true, name: true },
  },
  _count: {
    select: { participants: true },
  },
}

@Injectable()
export class ImmersionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateImmersionDto) {
    return this.prisma.immersion.create({
      data: { name: dto.name, companyId: dto.companyId },
      select: LIST_SELECT,
    })
  }

  async findAll(companyId?: string) {
    return this.prisma.immersion.findMany({
      where: companyId ? { companyId } : undefined,
      select: LIST_SELECT,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    const immersion = await this.prisma.immersion.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
        companyId: true,
        createdAt: true,
        company: { select: { id: true, name: true } },
        participants: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            evaluation: {
              select: {
                overallScore: true,
                recommendation: true,
              },
            },
          },
        },
      },
    })

    if (!immersion) throw new NotFoundException('Imersão não encontrada')

    return immersion
  }

  async findByCompany(companyId: string) {
    return this.prisma.immersion.findMany({
      where: { companyId },
      select: LIST_SELECT,
      orderBy: { createdAt: 'desc' },
    })
  }

  async close(id: string) {
    const immersion = await this.prisma.immersion.findUnique({ where: { id } })
    if (!immersion) throw new NotFoundException('Imersão não encontrada')

    return this.prisma.immersion.update({
      where: { id },
      data: { status: ImmersionStatus.CLOSED },
      select: LIST_SELECT,
    })
  }

  async archive(id: string) {
    const immersion = await this.prisma.immersion.findUnique({ where: { id } })
    if (!immersion) throw new NotFoundException('Imersão não encontrada')

    return this.prisma.immersion.update({
      where: { id },
      data: { status: ImmersionStatus.ARCHIVED },
      select: LIST_SELECT,
    })
  }

  async remove(id: string) {
    const immersion = await this.prisma.immersion.findUnique({
      where: { id },
      include: { participants: { select: { id: true } } },
    })

    if (!immersion) throw new NotFoundException('Imersão não encontrada')

    const participantIds = immersion.participants.map(p => p.id)

    await this.prisma.$transaction([
      this.prisma.evaluation.deleteMany({
        where: { participantId: { in: participantIds } },
      }),
      this.prisma.participant.deleteMany({
        where: { immersionId: id },
      }),
      this.prisma.immersion.delete({
        where: { id },
      }),
    ])

    return { deleted: true }
  }
}