import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Message } from "../enum/message.enum";
// import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { convertName } from "../middleware/convertName";
import { ResponseData } from 'helper/formatReturn';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async getCategory() {
    const result = await this.categoryRepository.find();
    return ResponseData.success(result, Message.GET_SUCCESS)
  }

  async createCategory(category: CreateCategoryDto) {
    category.name = convertName(category.name);
    const checkName = await this.categoryRepository.findOne({ where: { name: category.name } });
    if (checkName) {
      return ResponseData.error(`Category ${Message.WAS_EXITS}`)
    }
    const insertCategory = await this.categoryRepository.save(category);
    return ResponseData.success(insertCategory, Message.CREATE_SUCCESS)
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const checkCategory = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.id } });
    if (!checkCategory) {
      return ResponseData.error(`Category ${Message.DOES_NOT_EXIST}`)
    }
    updateCategoryDto.name = convertName(updateCategoryDto.name);
    const checkName = await this.categoryRepository.findOne({ where: { name: updateCategoryDto.name } });
    if (checkName) {
      return ResponseData.error(`Name ${Message.WAS_EXITS}`);
    }
    const updateCategory = await this.categoryRepository.update(updateCategoryDto.id, updateCategoryDto);
    return ResponseData.success(updateCategory, Message.UPDATE_SUCCESS,)
  }
}
