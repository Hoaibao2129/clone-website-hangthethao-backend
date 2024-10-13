import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategory() {
    return this.categoryService.getCategory();
  }
}
