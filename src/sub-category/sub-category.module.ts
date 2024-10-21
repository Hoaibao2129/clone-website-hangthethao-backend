import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from '../entities/subCategory.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, Category])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule { }
