import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('subCategory')
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.subCategoryEntity)
  categoryEntity: Category;
}
