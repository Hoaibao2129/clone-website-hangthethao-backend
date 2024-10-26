import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { SubCategory } from './subCategory.entity';
import { ProductQuantity } from './productQuantity.entity'
import { CartDetail } from './cartDetail.entity';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String, length: 255 })
    name: string;

    @Column({ type: Number })
    price: number;

    @Column('text', { array: true, nullable: true, default: [] })
    image: string[];

    @Column("text", { nullable: true })
    rating: number;

    @Column('text', { nullable: true })
    description: string;

    @Column({ default: false })
    soldOut: boolean;

    @Column({ type: 'int', nullable: true })
    quantity: number;

    // @Column({ nullable: true })
    // brand: string;

    @ManyToOne(() => Category, (category: Category) => category.products, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToOne(() => SubCategory, (subCategory: SubCategory) => subCategory.products, { eager: true })
    @JoinColumn({ name: 'subCategoryId' })
    subCategory: SubCategory;

    @OneToMany(() => ProductQuantity, (productQuantity: ProductQuantity) => productQuantity.product)
    productQuantity: ProductQuantity[];

    @OneToMany(() => CartDetail, (cartDetail: CartDetail) => cartDetail.product)
    cartDetail: CartDetail[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}