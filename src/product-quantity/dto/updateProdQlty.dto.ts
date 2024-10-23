import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateProdQuantityDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}