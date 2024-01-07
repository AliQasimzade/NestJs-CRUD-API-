import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, maxlength: 200 })
  title: string;

  @Prop({ required: true, maxlength: 300 })
  description: string;

  @Prop({ required: true })
  salePrice: number;

  @Prop({ required: true })
  costPrice: number;

  @Prop({ required: true })
  stockCount: number;

  @Prop({ default: null })
  image: string | null;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
