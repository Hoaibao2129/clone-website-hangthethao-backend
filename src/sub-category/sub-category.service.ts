import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { Category } from 'category/entities/category.entity';
import { createSubCategoryDto } from './dto/createSubCategory.dto';
import { Message } from 'enum/message.enum';
import { convertName } from 'middleware/convertName';
import { ResponseData } from '../helper/formatReturn';
import { UpdateCategoryDto } from "../sub-category/dto/updateSubCategory.dto"
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

    async getCategory() {
        const subCategory = await this.subCategoryRepository.find({});
        return ResponseData.success(subCategory, `${Message.GET_SUCCESS}`)
    }

    async updateCategory(updateSubCategory: UpdateCategoryDto) {
        const checkSCTG = await this.subCategoryRepository.findOne({ where: { id: updateSubCategory.id } });
        if (!checkSCTG) {
            return ResponseData.error(`SubCategory ${Message.DOES_NOT_EXIST}`)
        }
        if (updateSubCategory.categoryId) {
            const checkCtg = await this.categoryRepository.findOne({ where: { id: updateSubCategory.categoryId } });
            if (!checkCtg) {
                return ResponseData.error(`Category ${Message.DOES_NOT_EXIST}`)
            }
        }
        const updateSCTG = await this.subCategoryRepository.save(updateSubCategory);
        return ResponseData.success(updateSCTG, `${Message.UPDATE_SUCCESS}`)
    }

    async deleteCategory(subCategoryId: number) {
        const deleteSCTG = await this.subCategoryRepository.delete({ id: subCategoryId });
        if (deleteSCTG.affected === 0) {
            return ResponseData.error(`Sub Category ${Message.DOES_NOT_EXIST}`)
        }
        return ResponseData.success(deleteSCTG, `${Message.DELETE_SUCCESS}`)
    }
}

