// src/immersion/dto/create-immersion.dto.ts

import { IsString, IsNotEmpty } from 'class-validator'

export class CreateImmersionDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  companyId: string
}