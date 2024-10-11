import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private itemRepository: Repository<Category>,
  ) {}
  async getCategory() {
    const result = await this.itemRepository.find();
    console.log(result);
    // return await this.itemRepository.find();
  }
}
