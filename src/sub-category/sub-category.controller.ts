import { Body, Controller, Post } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { createSubCategoryDto } from './dto/createSubCategory.dto';

@Controller('sub-category')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) { }

    @Post()
    async createSubCategory(@Body() subCategory: createSubCategoryDto) {
        return this.subCategoryService.createSubCategory(subCategory)
    }
}
