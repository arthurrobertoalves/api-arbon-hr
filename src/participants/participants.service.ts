import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCompanyDto } from 'src/company/dto/update-company.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    try {
      return await this.prisma.participant.create({
        data: {
          name: createParticipantDto.name,
          companyId: createParticipantDto.companyId,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.participant.findMany({
      select: {
        id: true,
        name: true,
        companyId: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.participant.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        companyId: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Company not found');
    }

    return user;
  }
  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const data: Partial<UpdateParticipantDto> = { ...updateParticipantDto };

    try {
      return await this.prisma.participant.update({
        where: { id },
        data: {
          name: data.name,
          companyId: data.companyId,
        },

        select: {
          id: true,
          name: true,
          companyId: true,
        },
      });
    } catch {
      throw new NotFoundException('Company not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.participant.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          companyId: true,
        },
      });
    } catch {
      throw new NotFoundException('Participant not found');
    }
  }
}
