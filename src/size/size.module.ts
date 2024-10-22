import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  providers: [SizeService],
  controllers: [SizeController]
})
export class SizeModule { }
