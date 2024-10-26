import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_detail')
export class CartDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(() => Cart, (cart: Cart) => cart.cartDetail)
    @JoinColumn()
    cart: Cart;
}