// src/company/application/use-cases/update-company.use-case.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { CompanyRepository } from '../../domain/repositories/company.repository'
import type { UpdateCompanyDto } from '../dto/update-company.dto'

@Injectable()
export class UpdateCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(id: string, dto: UpdateCompanyDto) {
    try {
      return await this.repo.update(id, dto)
    } catch {
      throw new NotFoundException('Empresa não encontrada')
    }
  }
}