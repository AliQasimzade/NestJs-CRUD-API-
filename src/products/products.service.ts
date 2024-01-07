import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product-dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<CreateProductDto[]> {
    return await this.productModel.find({}, { costPrice: 0 });
  }

  async createNewProduct(createNewProduct: CreateProductDto): Promise<any> {
    try {
      const createdProduct = new this.productModel({ ...createNewProduct });
      createdProduct.save();
      return { message: 'New product created is successfully', status: true };
    } catch (error) {
      return error.response;
    }
  }
}
