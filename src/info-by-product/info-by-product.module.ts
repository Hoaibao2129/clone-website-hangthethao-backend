import { Module } from '@nestjs/common';
import { InfoByProductController } from './info-by-product.controller';
import { InfoByProductService } from './info-by-product.service';
import { InfoBuyProduct } from 'entities/infoBuyProduct.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InfoBuyProduct])],
  controllers: [InfoByProductController],
  providers: [InfoByProductService]
})
export class InfoByProductModule { }
