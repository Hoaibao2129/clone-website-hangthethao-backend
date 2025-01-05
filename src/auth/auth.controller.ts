import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { refreshTokenDto } from "./dto/refresh_token";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.tell, loginDto.password);
        if (user) {
            const payload = {
                id: user.id,
                name: user.name,
                tel: user.tel,
            }
            const accessToken = await this.authService.generateToken(payload, process.env.ACCESS_TOKEN_SECRET || '', '1h');
            const refreshToken = await this.authService.generateToken(payload, process.env.REFRESH_TOKEN_SECRET || '', '14 days');
            const dataResponse = {
                ...user,
                accessToken,
                refreshToken
            }
            return {
                data: dataResponse,
                message: "Login successfully",
                isSuccess: true
            };
        }
        return {
            data: null,
            message: "Login failed",
            isSuccess: false
        }

    }

    @Put('refresh_token')
    async refreshToken(@Body() Body: refreshTokenDto) {
        const checkRefreshToken = await this.authService.verifyToken(Body.refresh_token, process.env.REFRESH_TOKEN_SECRET || '');
        if (checkRefreshToken) {
            const payload = {
                id: checkRefreshToken.id,
                name: checkRefreshToken.name,
                tel: checkRefreshToken.tel,
            }

            const accessToken = await this.authService.generateToken(payload, process.env.ACCESS_TOKEN_SECRET || '', '1h');

            const dataResponse = {
                ...payload,
                accessToken,
            }

            return {
                data: dataResponse,
                message: "Login successfully",
                isSuccess: true
            };
        }

        return {
            data: null,
            message: "Refresh token failed",
            isSuccess: false
        }
    }
}
