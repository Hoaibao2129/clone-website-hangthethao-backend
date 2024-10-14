import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Message } from "../enum/message.enum";
// import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { convertName } from "../middleware/convertName";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async getCategory() {
    const result = await this.categoryRepository.find();
    return {
      data: result,
      IsSuccess: true,
      Message: Message.GET_SUCCESS,
    }
  }

  async createCategory(category: CreateCategoryDto) {
    category.name = convertName(category.name);
    const checkName = await this.categoryRepository.findOne({ where: { name: category.name } });
    if (checkName) {
      return {
        data: null,
        IsSuccess: false,
        Message: `Category ${Message.WAS_EXITS}`,
      }
    }
    const insertCategory = await this.categoryRepository.save(category);
    return {
      data: insertCategory,
      IsSuccess: true,
      Message: Message.CREATE_SUCCESS,
    }
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const checkCategory = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.id } });
    if (!checkCategory) {
      return {
        data: null,
        IsSuccess: false,
        Message: `Category ${Message.DOES_NOT_EXIST}`,
      }
    }
    updateCategoryDto.name = convertName(updateCategoryDto.name);
    const updateCategory = await this.categoryRepository.save(updateCategoryDto)
    return {
      data: updateCategory,
      IsSuccess: true,
      Message: Message.UPDATE_SUCCESS,
    }
  }
}
