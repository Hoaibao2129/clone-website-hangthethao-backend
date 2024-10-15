import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Message } from "enum/message.enum";

export class createSubCategoryDto {
    @ApiProperty({ example: 'category' })
    @IsString()
    @IsNotEmpty({ message: `name ${Message.IS_NOT_EMPTY}` })
    name: string;

    @ApiProperty({ example: "1" })
    @IsNumber()
    @IsNotEmpty({ message: `categoryId ${Message.IS_NOT_EMPTY}` })
    categoryId: number
}