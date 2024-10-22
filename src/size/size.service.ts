import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from 'entities/size.entity';
import { Message } from 'enum/message.enum';
import { ResponseData } from 'helper/formatReturn';
import { Repository } from 'typeorm';
@Injectable()
export class SizeService {
    constructor(
        @InjectRepository(Size)
        private sizeRepository: Repository<Size>,
    ) { }

    async insertSize(size: Size) {
        const saveSize = await this.sizeRepository.save(size);
        return ResponseData.success(saveSize, Message.CREATE_SUCCESS);
    }

    async getAllSize() {
        const getAllSize = await this.sizeRepository.find();
        return ResponseData.success(getAllSize, Message.GET_SUCCESS);
    }


}
