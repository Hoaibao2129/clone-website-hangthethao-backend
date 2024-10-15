import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { Category } from 'category/entities/category.entity';
import { createSubCategoryDto } from './dto/createSubCategory.dto';
import { Message } from 'enum/message.enum';
import { convertName } from 'middleware/convertName';
import { ResponseData } from '../helper/formatReturn';
@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory)
        private subCategoryRepository: Repository<SubCategory>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async createSubCategory(subCategory: createSubCategoryDto) {
        const checkCtg = await this.categoryRepository.findOne({ where: { id: subCategory.categoryId } });
        if (!checkCtg) {
            return ResponseData.error(`Category ${Message.DOES_NOT_EXIST}`)
        }
        subCategory.name = convertName(subCategory.name);
        const checkNameSCTG = await this.subCategoryRepository.findOne({ where: { name: subCategory.name } });
        if (checkNameSCTG) {

            return ResponseData.error(`Category ${Message.DOES_NOT_EXIST}`)
        }
        const createSCTG = await this.subCategoryRepository.save(subCategory);
        return ResponseData.success(createSCTG, `${Message.CREATE_SUCCESS}`)
    }
}

