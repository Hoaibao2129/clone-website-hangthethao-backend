import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

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
            const accessToken = await this.authService.generateAccessToken(payload);
            user.token = accessToken;
            return {
                data: user,
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
}
