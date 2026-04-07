// src/evaluation/dto/create-evaluation.dto.ts

import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum, Min, Max } from 'class-validator'
import { Recommendation } from 'generated/prisma/enums'

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  participantId: string

  @IsInt()
  @IsOptional()
  @Min(0) @Max(100)
  leadershipScore?: number

  @IsInt()
  @IsOptional()
  @Min(0) @Max(100)
  decisionScore?: number

  @IsInt()
  @IsOptional()
  @Min(0) @Max(100)
  communicationScore?: number

  @IsInt()
  @IsOptional()
  @Min(0) @Max(100)
  adaptabilityScore?: number

  @IsInt()
  @IsOptional()
  @Min(0) @Max(100)
  pressureScore?: number

  @IsInt()
  @IsOptional()
  @Min(0) @Max(100)
  overallScore?: number

  @IsString()
  @IsOptional()
  strengths?: string

  @IsString()
  @IsOptional()
  risks?: string

  @IsString()
  @IsOptional()
  observations?: string

  @IsEnum(Recommendation)
  recommendation: Recommendation
}