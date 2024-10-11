import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('subCategory')
export class SubCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @OneToMany(() => Category, (category) => category.subCategoryEntity)
  categoryEntity: Category;
}
