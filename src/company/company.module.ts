// src/company/company.module.ts

import { Module } from '@nestjs/common'
import { CompanyController } from './infra/http/company.controller'
import { CompanyRepository } from './domain/repositories/company.repository'
import { PrismaCompanyRepository } from './infra/repositories/prisma-company.repository'
import { CreateCompanyUseCase } from './application/use-cases/create-company.use-case'
import { FindAllCompaniesUseCase } from './application/use-cases/find-all-companies.use-case'
import { FindOneCompanyUseCase } from './application/use-cases/find-one-company.use-case'
import { UpdateCompanyUseCase } from './application/use-cases/update-company.use-case'
import { DeleteCompanyUseCase } from './application/use-cases/delete-company.use-case'

@Module({
  controllers: [CompanyController],
  providers: [
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
    CreateCompanyUseCase,
    FindAllCompaniesUseCase,
    FindOneCompanyUseCase,
    UpdateCompanyUseCase,
    DeleteCompanyUseCase,
  ],
})
export class CompanyModule {}