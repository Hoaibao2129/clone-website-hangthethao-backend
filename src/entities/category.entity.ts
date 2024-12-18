import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { SubCategory } from './subCategory.entity';
import { Product } from './product.entity';

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


  @OneToMany(() => SubCategory, subcategory => subcategory.category)
  @JoinColumn()
  subCategories: SubCategory[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
