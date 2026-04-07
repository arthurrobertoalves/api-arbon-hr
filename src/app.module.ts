import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { ParticipantsModule } from './participants/participants.module';
import { ImmersionModule } from './immersion/immersion.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),

    CompanyModule,

    ParticipantsModule,

    ImmersionModule,

    EvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
