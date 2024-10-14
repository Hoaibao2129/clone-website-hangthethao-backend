import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';


@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategory() {
    return this.categoryService.getCategory();
  }

  @Put()
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Post()
  async createCategory(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategory);
  }
}
