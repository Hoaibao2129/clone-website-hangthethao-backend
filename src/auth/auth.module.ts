import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      global: true
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
