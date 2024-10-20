import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
// import { FirebaseModule } from 'firebase/firebase.module';
import { FirebaseService } from 'firebase/firebaseService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'category/entities/category.entity';
import { Product } from './entities/product.entity';
import { SubCategory } from 'sub-category/entities/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, SubCategory])],
  controllers: [ProductController],
  providers: [ProductService, FirebaseService]
})
export class ProductModule { }
