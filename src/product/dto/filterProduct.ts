import { IsNumberString, IsOptional } from 'class-validator';
export class FilterProduct {
    @IsOptional()
    @IsNumberString()
    categoryId?: string;

    @IsOptional()
    @IsNumberString()
    subCategoryId?: string;
}