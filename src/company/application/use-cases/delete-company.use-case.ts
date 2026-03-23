// src/company/application/use-cases/delete-company.use-case.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { CompanyRepository } from '../../domain/repositories/company.repository'

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(id: string) {
    try {
      return await this.repo.delete(id)
    } catch {
      throw new NotFoundException('Empresa não encontrada')
    }
  }
}