import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SubCategoryEntity } from '../../sub-category/entities/subCategory.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => SubCategoryEntity,
    (subCategory) => subCategory.categoryEntity,
    { nullable: true },
  )
  subCategoryEntity: SubCategoryEntity[];
}
