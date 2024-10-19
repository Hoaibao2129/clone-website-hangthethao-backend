import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { CreateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { convertDataCreatePROD } from 'middleware/convertDataCreatePROD';
@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) { }

    @Post("")
    @UseInterceptors(FilesInterceptor('image', 10)) // image is name in form data and 10 is limit file size
    async insertProduct(@UploadedFiles() images: Array<Express.Multer.File>, @Body() product: any) {
        return this.productService.insertProduct(images, convertDataCreatePROD(product));
    }
}
