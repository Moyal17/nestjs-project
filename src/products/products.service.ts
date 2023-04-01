import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllProducts(): Promise<Product[] | null> {
    return this.prisma.product.findMany();
  }
  getProductById(id: number): Promise<Partial<Product> | null> {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        price: true,
        sale: true,
      },
    });
  }
  async create(body: CreateProductDto): Promise<Partial<Product>> {
    return this.prisma.product.create({
      data: body,
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        createdAt: true,
      },
    });
  }
  update(id: number, product: Product): Promise<Product | null> {
    return this.prisma.product.update({
      where: { id },
      data: product,
    });
  }
  async delete(id: number): Promise<Partial<Product> | null> {
    return this.prisma.product.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
