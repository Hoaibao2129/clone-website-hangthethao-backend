import { Module } from '@nestjs/common';
import { InfoByProductController } from './info-by-product.controller';
import { InfoByProductService } from './info-by-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoBuyProduct } from 'entities/infoBuyProduct.entity';
@Module({
  imports: [TypeOrmModule.forFeature([InfoBuyProduct])],
  controllers: [InfoByProductController],
  providers: [InfoByProductService]
})
export class InfoByProductModule { }
