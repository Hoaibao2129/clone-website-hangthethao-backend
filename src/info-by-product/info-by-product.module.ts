import { Module } from '@nestjs/common';
import { InfoByProductController } from './info-by-product.controller';
import { InfoByProductService } from './info-by-product.service';

@Module({
  controllers: [InfoByProductController],
  providers: [InfoByProductService]
})
export class InfoByProductModule {}
