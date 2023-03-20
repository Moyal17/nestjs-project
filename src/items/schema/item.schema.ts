import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/*
// one way to create Schema by mongoose
export const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  qty: Number
})
*/

// this way is the Nest way

export type ItemDocument = HydratedDocument<Item>;
@Schema()
export class Item {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  qty: number;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
