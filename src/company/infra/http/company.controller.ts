// src/company/infrastructure/http/company.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'generated/prisma/enums'
import { CreateCompanyUseCase } from '../../application/use-cases/create-company.use-case'
import { FindAllCompaniesUseCase } from '../../application/use-cases/find-all-companies.use-case'
import { FindOneCompanyUseCase } from '../../application/use-cases/find-one-company.use-case'
import { UpdateCompanyUseCase } from '../../application/use-cases/update-company.use-case'
import { DeleteCompanyUseCase } from '../../application/use-cases/delete-company.use-case'
import type { CreateCompanyDto } from '../../application/dto/create-company.dto'
import type { UpdateCompanyDto } from '../../application/dto/update-company.dto'

@Controller('company')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class CompanyController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly findAllCompanies: FindAllCompaniesUseCase,
    private readonly findOneCompany: FindOneCompanyUseCase,
    private readonly updateCompany: UpdateCompanyUseCase,
    private readonly deleteCompany: DeleteCompanyUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.createCompany.execute(dto)
  }

  @Get()
  findAll() {
    return this.findAllCompanies.execute()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneCompany.execute(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.updateCompany.execute(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCompany.execute(id)
  }
}