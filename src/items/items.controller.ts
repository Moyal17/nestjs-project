import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ErrorResponse, Item } from './interfaces/items.interfaces';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Promise<Item[] | null> {
    // Question: is it best practice to write 'Item | null' ?
    return this.itemsService.findAll();
  }
  @Get(':id')
  async findOne(@Param() param: { id: string }): Promise<Item | ErrorResponse> {
    // Question: how to declare params as an object with an id prop 'string' in it?
    // getting a warning when I remove the ': { id: string }' from params
    const itemData = await this.itemsService.findOne(param.id);
    // Question 2: would you make an interface about returning an Item or an ErrorResponse?
    if (!itemData) return { status: 404, message: 'Item doesnt exist' };
    return itemData;
  }
  @Post()
  async create(
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item | ErrorResponse> {
    try {
      // Question: by removing the async I get errors that are a bit unclear
      console.log(`Create an item: ${createItemDto.name}, desc: ${createItemDto.description}, quantity: ${createItemDto.qty}`);
      return this.itemsService.create(createItemDto);
    } catch (e) {
      return { status: 500, message: 'Error on creating Item' };
    }
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Item | null> {
    // Question: are declaring param props in @Param are better then > findOne(@Param() param)?
    console.log(`Delete Item id: ${id}`);
    return this.itemsService.delete(id);
  }
  @Put(':id')
  update(
    @Body() updateItemDto: CreateItemDto,
    @Param('id') id: string,
  ): Promise<Item | null> {
    console.log(`Update item id ${id}: ${updateItemDto.name}, desc: ${updateItemDto.description}, quantity: ${updateItemDto.qty}`);
    return this.itemsService.update(id, updateItemDto);
  }
}
