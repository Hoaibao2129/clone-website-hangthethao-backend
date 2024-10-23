import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Size } from './size.entity'

@Entity('product_quantity')
export class ProductQuantity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Product, (product: Product) => product.productQuantity)
    @JoinColumn()
    product: Product;

    @ManyToOne(() => Size, (size: Size) => size.productQuantity)
    @JoinColumn()
    size: Size

}