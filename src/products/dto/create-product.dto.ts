import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  image: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsNumber()
  sale: number;
}
