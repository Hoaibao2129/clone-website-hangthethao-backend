import { Injectable } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        private readonly jwtService: JwtService,
    ) { }

    async generateAccessToken(payload: any) {
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '15m',
        });
    }

    async findUserByTell(tell: string) {
        return await this.adminRepository.findOne({ where: { tel: tell } });
    }

    async validateUser(tell: string, password: string) {
        const user = await this.findUserByTell(tell);
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async generateRefreshToken(payload: any) {
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '15m',
        });
    }
}
