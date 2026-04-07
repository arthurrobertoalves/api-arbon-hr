import { PartialType } from '@nestjs/mapped-types';
import { CreateImmersionDto } from './create-immersion.dto';

export class UpdateImmersionDto extends PartialType(CreateImmersionDto) {}
