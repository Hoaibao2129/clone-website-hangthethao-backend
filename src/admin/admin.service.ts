import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminCreateDto } from './dto/adminCreate.dto';
import { convertName } from 'middleware/convertName';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private repository: Repository<Admin>
    ) { }

    async insertAdmin(admin: AdminCreateDto) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword;
        admin.name = convertName(admin.name);
        const result = await this.repository.save(admin);
        return result;
    }
}
