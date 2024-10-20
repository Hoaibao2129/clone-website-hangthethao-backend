import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateProductDto {
    constructor() {
        this.rating = 0;
        this.quantity = 0;
        this.soldOut = true;
    }
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    price: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    image: string[];

    @IsNumber()
    @IsOptional()
    rating: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    soldOut: boolean;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsString()
    @IsOptional()
    brand: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    subCategoryId: number;
}