import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductQuantity } from './productQuantity.entity';
@Entity('size')
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ProductQuantity, (productQuantity: ProductQuantity) => productQuantity.size)
    productQuantity: ProductQuantity[];


}