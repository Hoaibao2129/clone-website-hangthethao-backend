import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { CartDetail } from './cartDetail.entity';

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => CartDetail, (cartDetail: CartDetail) => cartDetail.cart)
    cartDetail: CartDetail[];
}