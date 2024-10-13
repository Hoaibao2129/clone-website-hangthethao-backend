import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { SubCategoryEntity } from '../../sub-category/entities/subCategory.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => SubCategoryEntity,
    (subCategory) => subCategory.categoryEntity,
    { nullable: true },
  )
  subCategoryEntity: SubCategoryEntity[];
}
