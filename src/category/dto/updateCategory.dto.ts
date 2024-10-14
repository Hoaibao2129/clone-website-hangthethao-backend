import { CreateCategoryDto } from "./createCategory.dto";

export class UpdateCategoryDto extends CreateCategoryDto {
    constructor() {
        super();
    }
    id: number;
}