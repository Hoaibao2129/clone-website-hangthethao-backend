import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { CreateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { convertDataCreatePROD } from 'middleware/convertDataCreatePROD';
import { ApiTags } from '@nestjs/swagger';
import { FilterProduct } from './dto/filterProduct';
@Controller('product')
@ApiTags('product')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) { }

    @Post("")
    @UseInterceptors(FilesInterceptor('image', 10)) // image is name in form data and 10 is limit file size
    async insertProduct(@UploadedFiles() images: Array<Express.Multer.File>, @Body() product: any) {
        return this.productService.insertProduct(images, convertDataCreatePROD(product));
    }

    @Get("")
    async getProduct(
        @Query('categoryId') categoryId: number,
        @Query('subCategoryId') subCategoryId: number,
    ) {
        const filterProduct: FilterProduct = new FilterProduct();
        if (categoryId) {
            filterProduct.categoryId = categoryId;
        }
        if (subCategoryId) {
            filterProduct.subCategoryId = subCategoryId;
        }
        return this.productService.getProducts(filterProduct);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(+id);
    }

}
