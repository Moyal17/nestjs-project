import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAllProducts(): Promise<Product[] | null> {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  findProductById(@Param('id') id: number): Promise<Partial<Product> | null> {
    return this.productsService.getProductById(id);
  }
  @Post()
  @UseGuards(JwtGuard)
  create(@Body() body: CreateProductDto): Promise<Partial<Product>> {
    console.log(`create | body: ${body}`);
    return this.productsService.create(body);
  }
  @Patch()
  @UseGuards(JwtGuard)
  update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: Product,
  ): Promise<Product | null> {
    console.log(`id ${productId} | body: ${body}`);
    return this.productsService.update(productId, body);
  }
  @Delete()
  @UseGuards(JwtGuard)
  delete(@Body('id') id: number): Promise<Partial<Product> | null> {
    console.log(`id ${id}`);
    return this.productsService.delete(id);
  }
}
