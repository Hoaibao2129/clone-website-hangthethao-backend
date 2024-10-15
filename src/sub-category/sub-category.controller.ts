import { Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { createSubCategoryDto } from './dto/createSubCategory.dto';
import { UpdateCategoryDto } from "./dto/updateSubCategory.dto"
import { ApiTags } from '@nestjs/swagger';

@Controller('sub-category')
@ApiTags('sub-category')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) { }

    @Post()
    async createSubCategory(@Body() subCategory: createSubCategoryDto) {
        return this.subCategoryService.createSubCategory(subCategory)
    }

    @Get()
    async getCategory() {
        return this.subCategoryService.getCategory();
    }

    @Put()
    async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
        return this.subCategoryService.updateCategory(updateCategoryDto)
    }

    @Delete(':id')
    async deleteCategory(@Param('id') subCategoryId: string) {
        return this.subCategoryService.deleteCategory(+subCategoryId)
    }
}
