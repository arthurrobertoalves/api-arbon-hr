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
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const passwordMacthes = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordMacthes) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.jwtService.sign({ name: user.name, email: user.email });
    return { access_token: token };
  }
}
