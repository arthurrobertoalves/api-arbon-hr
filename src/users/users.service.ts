import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          code: createUserDto.code,
          role: createUserDto.role,
          companyId: createUserDto.companyId,
          },
        },
      );
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException('ID/Code Conflict');
      }

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
        code: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        role: true,
        code: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: Partial<UpdateUserDto> = { ...updateUserDto };

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          role: data.role,
          code: data.code,
          company: {
            connect: { id: data.companyId },
          },
        },
        select: {
          id: true,
          role: true,
          code: true,
        },
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          role: true,
          code: true,
        },
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
