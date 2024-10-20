import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Product } from 'product/entities/product.entity';

@Entity('subCategory')
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.subCategories)
  category: Category;

  @OneToMany(() => Product, (product: Product) => product.subCategory)
  products: Product[];

  // @OneToMany(() => Category, (category) => category.subCategoryEntity)
  // categoryEntity: Category;
}
