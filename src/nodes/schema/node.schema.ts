import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Node {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Node' })
  parentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Node' })
  leftChild?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Node' })
  rightChild?: Types.ObjectId;
}

export type NodeDocument = Node & Document;
export const NodeSchema = SchemaFactory.createForClass(Node);
