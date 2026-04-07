// src/immersion/immersion.controller.ts

import {
  Controller, Get, Post, Delete,
  Body, Param, Query, Patch, UseGuards,
} from '@nestjs/common'
import { ImmersionService } from './immersion.service'
import { CreateImmersionDto } from './dto/create-immersion.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { UserRole } from 'generated/prisma/enums'
import type { User } from 'generated/prisma/client'

@Controller('immersions')
@UseGuards(AuthGuard, RolesGuard)
export class ImmersionController {
  constructor(private readonly immersionService: ImmersionService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateImmersionDto) {
    return this.immersionService.create(dto)
  }

  @Get('me')
  findMine(@CurrentUser() user: User) {
    return this.immersionService.findByCompany(user.companyId!)
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query('companyId') companyId?: string) {
    return this.immersionService.findAll(companyId)
  }

  @Patch(':id/close')
  @Roles(UserRole.ADMIN)
  close(@Param('id') id: string) {
    return this.immersionService.close(id)
  }

  @Patch(':id/archive')
  @Roles(UserRole.ADMIN)
  archive(@Param('id') id: string) {
    return this.immersionService.archive(id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.immersionService.findOne(id)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.immersionService.remove(id)
  }
}