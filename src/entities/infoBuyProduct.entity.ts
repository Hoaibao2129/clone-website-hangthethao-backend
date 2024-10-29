import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HistoryBuyProduct } from "./historyBuyProduct.entity";

@Entity('info_buy_product')
export class InfoBuyProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerEmail: string;

    @Column()
    customerTel: string;

    @Column()
    customerName: string;

    @Column()
    customerAddress: string;

    @Column()
    customerProvince: string;

    @Column()
    customerDistrict: string;

    @Column()
    customerWard: string;

    @Column()
    customerNote: string;

    @OneToOne(() => HistoryBuyProduct, (historyBuyProduct: HistoryBuyProduct) => historyBuyProduct.infoBuyProduct)
    @JoinColumn()
    historyBuyProduct: HistoryBuyProduct
}