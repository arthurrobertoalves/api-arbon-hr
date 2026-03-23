// src/company/infrastructure/repositories/prisma-company.repository.ts

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CompanyRepository } from '../../domain/repositories/company.repository'
import { Company } from '../../domain/entities/company.entity'
import type { CreateCompanyDto } from '../../application/dto/create-company.dto'
import type { UpdateCompanyDto } from '../../application/dto/update-company.dto'

const SELECT = {
  id: true,
  name: true,
  cnpj: true,
  email: true,
  phone: true,
  site: true,
  sector: true,
}

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): Company {
    return new Company(
      raw.id,
      raw.name,
      raw.cnpj,
      raw.email,
      raw.phone,
      raw.site,
      raw.sector,
    )
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    const raw = await this.prisma.company.create({ data, select: SELECT })
    return this.toEntity(raw)
  }

  async findAll(): Promise<Company[]> {
    const rows = await this.prisma.company.findMany({ select: SELECT })
    return rows.map(this.toEntity)
  }

  async findById(id: string): Promise<Company | null> {
    const raw = await this.prisma.company.findUnique({ where: { id }, select: SELECT })
    return raw ? this.toEntity(raw) : null
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    const raw = await this.prisma.company.update({ where: { id }, data, select: SELECT })
    return this.toEntity(raw)
  }

  async delete(id: string): Promise<Company> {
    const raw = await this.prisma.company.delete({ where: { id }, select: SELECT })
    return this.toEntity(raw)
  }
}