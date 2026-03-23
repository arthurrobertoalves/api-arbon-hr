// src/company/application/use-cases/find-all-companies.use-case.ts

import { Injectable } from '@nestjs/common'
import { CompanyRepository } from '../../domain/repositories/company.repository'

@Injectable()
export class FindAllCompaniesUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute() {
    return this.repo.findAll()
  }
}