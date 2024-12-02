import { Module } from '@nestjs/common';
import { HistoryByProductController } from './history-by-product.controller';
import { HistoryByProductService } from './history-by-product.service';

@Module({
  controllers: [HistoryByProductController],
  providers: [HistoryByProductService]
})
export class HistoryByProductModule {}
