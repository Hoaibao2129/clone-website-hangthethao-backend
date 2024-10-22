import { Body, Controller, Get, Post } from '@nestjs/common';
import { SizeService } from './size.service';
import { ApiTags } from '@nestjs/swagger';
import { Size } from 'entities/size.entity';

@Controller('size')
@ApiTags('size')
export class SizeController {
    constructor(private sizeService: SizeService) { }

    @Post("")
    async insertSize(@Body() size: Size) {
        return this.sizeService.insertSize(size);
    }

    @Get("")
    async getAllSize() {
        return this.sizeService.getAllSize();
    }
}
