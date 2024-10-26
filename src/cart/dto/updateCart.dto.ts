import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCartDto {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}