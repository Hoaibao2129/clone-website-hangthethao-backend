import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./createCategory.dto";

export class UpdateCategoryDto extends CreateCategoryDto {
    constructor() {
        super();
    }
    @ApiProperty({ example: '1' })
    id: number;
}