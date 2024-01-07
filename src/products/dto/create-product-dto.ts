export class CreateProductDto {
  title: string;
  description: string;
  salePrice: number;
  costPrice: number;
  stockCount: number;
  image?: string | null;
}
