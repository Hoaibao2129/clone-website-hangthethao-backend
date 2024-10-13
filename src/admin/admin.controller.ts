import { Body, Controller, Post } from '@nestjs/common';
import { AdminCreateDto } from './dto/adminCreate.dto';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("admin")
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post()
    async createAdmin(@Body() admin: AdminCreateDto) {
        return await this.adminService.insertAdmin(admin);
    }
}
