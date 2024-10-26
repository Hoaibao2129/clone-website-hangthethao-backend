import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Cart } from "entities/cart.entity";
import { Product } from "entities/product.entity";

export class AddToCartDto {

    @IsOptional()
    @IsNumber()
    cartId: number;

    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    cart: Cart;

    @IsOptional()
    product: Product;
}