// src/evaluation/evaluation.module.ts

import { Module } from '@nestjs/common'
import { EvaluationService } from './evaluation.service'
import { EvaluationController } from './evaluation.controller'

@Module({
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}