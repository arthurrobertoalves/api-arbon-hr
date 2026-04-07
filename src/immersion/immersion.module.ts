// src/immersion/immersion.module.ts

import { Module } from '@nestjs/common'
import { ImmersionService } from './immersion.service'
import { ImmersionController } from './immersion.controller'

@Module({
  controllers: [ImmersionController],
  providers: [ImmersionService],
  exports: [ImmersionService],
})
export class ImmersionModule {}