import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./createCategory.dto";
import { IsDefined, IsNotEmpty, } from "class-validator";
import { Message } from "enum/message.enum";


export class UpdateCategoryDto extends CreateCategoryDto {
    constructor() {
        super();
    }

    @IsDefined({ message: `Id ${Message.INVALID_REQUEST}` })
    @IsNotEmpty({ message: `Id ${Message.INVALID_REQUEST}` })
    // @IsExists({ message: `Id ${Message.INVALID_REQUEST}` })
    @ApiProperty({ example: '1' })
    id: number;
}