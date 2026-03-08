import {
  Body,
  Controller,
  Post,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
@Post("login")
async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) res: Response
) {
  const result = await this.authService.login(loginDto);

  res.cookie("token", result.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return { success: true };
}
}
