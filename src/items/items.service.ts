import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/items.interfaces';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  /*
  // first time testing mockup items
  private readonly items: Item[] = [
    {
      id: '3e3r4t5y6u7',
      name: 'clock',
      description: 'Sand clock made out of glass',
      qty: 25,
    },
    {
      id: '1qi9w2ue38yr4',
      name: 'coffee cup',
      description: 'a beautiful cup of coffee for the mass!',
      qty: 45,
    },
  ];
  */
  async findAll(): Promise<Item[] | null> {
    return this.itemModel.find();
  }
  async findOne(id: string): Promise<Item | null> {
    // Question: is it best practice to write 'Item | null' ?
    return this.itemModel.findOne({ _id: id });
  }
  /*
  // the Promise way ...
  findOne(id: string): Promise<Item | null> {
    return new Promise((resolve) => {
      this.itemModel.findOne({ _id: id }).then((response) => {
        return resolve(response);
      });
    });
  }
  */

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }
  async delete(id: string): Promise<Item | null> {
    return this.itemModel.findByIdAndRemove({ _id: id });
  }
  async update(id: string, item: Item): Promise<Item | null> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
