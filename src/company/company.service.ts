import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: {
          ...createCompanyDto,
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
    return await this.prisma.company.findMany({
      select: {
        id: true,
        name: true,
        cnpj: true,
        email: true,
        phone: true,
        site: true,
        sector: true,
      },
    });
  }
  async findOne(id: string) {
    const user = await this.prisma.company.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        cnpj: true,
        email: true,
        phone: true,
        site: true,
        sector: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Company not found');
    }

    return user;
  }
  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const data: Partial<UpdateCompanyDto> = { ...updateCompanyDto };

    try {
      return await this.prisma.company.update({
        where: { id },
        data: {
          name: data.name,
          cnpj: data.cnpj,
          email: data.email,
          phone: data.phone,
          site: data.site,
          sector: data.sector,
        },

        select: {
          id: true,
          name: true,
          cnpj: true,
          email: true,
          phone: true,
          site: true,
          sector: true,
        },
      });
    } catch {
      throw new NotFoundException('Company not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.company.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          cnpj: true,
          email: true,
          phone: true,
          site: true,
          sector: true,
        },
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
