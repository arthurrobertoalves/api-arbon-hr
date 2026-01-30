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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: Partial<UpdateUserDto> = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: { id: id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
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
          name: true,
          email: true,
          role: true,
        },
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
