import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UserStrategy } from './strategys/strategy.user';
import { UserGuards } from './guards';
import { JwtStrategy } from './strategys/strategy.jwt';
import { JwtGuards } from './guards/guard.jwt';

@Global()
@Module({
  providers: [AuthService,PrismaService,ConfigService,UserStrategy,UserGuards,JwtStrategy,JwtGuards],
  exports: [AuthService]
})
export class AuthModule {}
