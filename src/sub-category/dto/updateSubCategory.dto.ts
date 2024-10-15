import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";
import { Message } from "enum/message.enum";
import { createSubCategoryDto } from "./createSubCategory.dto";

export class UpdateCategoryDto extends createSubCategoryDto {
    @ApiProperty({ example: '1' })
    @IsNumber()
    @IsEmpty({ message: `id ${Message.IS_NOT_EMPTY}` })
    id: number;
}