// src/company/application/use-cases/create-company.use-case.ts

import { ConflictException, Injectable } from '@nestjs/common'
import { CompanyRepository } from '../../domain/repositories/company.repository'
import type { CreateCompanyDto } from '../dto/create-company.dto'

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(dto: CreateCompanyDto) {
    try {
      return await this.repo.create(dto)
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('CNPJ ou email já cadastrado')
      }
      throw error
    }
  }
}