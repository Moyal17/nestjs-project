import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// Question: same as CreatProductDto right now
// best practice should make a separation or make the same class ?
export class EditProductDto {
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
