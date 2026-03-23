// src/company/application/use-cases/find-one-company.use-case.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { CompanyRepository } from '../../domain/repositories/company.repository'

@Injectable()
export class FindOneCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(id: string) {
    const company = await this.repo.findById(id)

    if (!company) {
      throw new NotFoundException('Empresa não encontrada')
    }

    return company
  }
}