import { Module } from '@nestjs/common';
import { ProductQuantityController } from './product-quantity.controller';
import { ProductQuantityService } from './product-quantity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductQuantity } from 'entities/productQuantity.entity';
import { Product } from 'entities/product.entity';
import { Size } from 'entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductQuantity, Product, Size])],
  controllers: [ProductQuantityController],
  providers: [ProductQuantityService]
})
export class ProductQuantityModule { }
