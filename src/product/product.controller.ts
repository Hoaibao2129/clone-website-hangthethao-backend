import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { convertDataCreatePROD } from 'middleware/convertDataCreatePROD';
import { ApiTags } from '@nestjs/swagger';
import { FilterProduct } from './dto/filterProduct';
import { CreateCategoryDto } from 'category/dto/createCategory.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
@Controller('product')
@ApiTags('product')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) { }

    @Post("")
    @UseInterceptors(FilesInterceptor('image', 10)) // image is name in form data and 10 is limit file size
    async insertProduct(@UploadedFiles() images: Array<Express.Multer.File>, @Body() product: CreateCategoryDto) {
        return this.productService.insertProduct(images, convertDataCreatePROD(product));
    }

    @Get("")
    async getProduct(@Query() query: FilterProduct) {
        const filterProduct: FilterProduct = new FilterProduct();
        if (query.categoryId) {
            filterProduct.categoryId = query.categoryId;
        }
        if (query.subCategoryId) {
            filterProduct.subCategoryId = query.subCategoryId;
        }
        console.log(query);

        return this.productService.getProducts(filterProduct);
    }

    @Put()
    @UseInterceptors(FilesInterceptor('image', 10))
    async updateProduct(@UploadedFiles() images: Array<Express.Multer.File>, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.updateProduct(images, convertDataCreatePROD(updateProductDto))
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(+id);
    }


}
