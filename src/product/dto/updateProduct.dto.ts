import { IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";
import { Message } from "enum/message.enum";

export class UpdateProductDto {

    @IsNumber()
    @IsNotEmpty({ message: Message.IS_NOT_EMPTY })
    id: number;

    @IsString()
    name: string;

    @IsOptional()
    imageDelete: string[];

    @IsNumber()
    @IsOptional()
    price: number;


    @IsString()
    @IsOptional()
    brand: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    categoryId: number;


    @IsNumber()
    @IsOptional()
    subCategoryId: number;

}