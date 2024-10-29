import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InfoBuyProduct } from "./infoBuyProduct.entity";
import { Cart } from "./cart.entity";

@Entity('history_buy_product')
export class HistoryBuyProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    discountCode: string;

    @Column()
    totalDiscount: number;

    @Column()
    deliveryFee: number;

    @Column()
    totalPrice: number;

    @OneToOne(() => InfoBuyProduct, (infoBuyProduct: InfoBuyProduct) => infoBuyProduct.historyBuyProduct)
    @JoinColumn()
    infoBuyProduct: InfoBuyProduct;

    @OneToOne(() => Cart, (cart: Cart) => cart.historyBuyProductEntity)
    @JoinColumn()
    cart: Cart
}