import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { CartDetail } from './cartDetail.entity';
import { HistoryBuyProduct } from './historyBuyProduct.entity';

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

    @OneToOne(() => HistoryBuyProduct, (historyBuyProductEntity: HistoryBuyProduct) => historyBuyProductEntity.cart)
    @JoinColumn()
    historyBuyProductEntity: HistoryBuyProduct;
}