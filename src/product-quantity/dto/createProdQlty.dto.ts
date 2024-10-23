import { IsNotEmpty, IsNumber } from "class-validator";
import { Product } from "entities/product.entity";
import { Size } from "entities/size.entity";

export class CreateProdQuantityDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    sizeId: number;


    product: Product;

    size: Size;

}