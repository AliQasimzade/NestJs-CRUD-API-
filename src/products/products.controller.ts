import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product-dto';
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  createProduct(@Body() reqBody: CreateProductDto) {
    return this.productService.createNewProduct(reqBody);
  }
}
