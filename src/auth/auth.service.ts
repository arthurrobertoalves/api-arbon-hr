import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { code: loginDto.code },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }


    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
      code: user.code,
    });
    return { access_token: token };
  }
}
