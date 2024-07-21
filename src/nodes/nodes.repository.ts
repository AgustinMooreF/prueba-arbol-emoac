import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Node, NodeDocument } from './schema/node.schema';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodesRepository {
  constructor(@InjectModel(Node.name) private nodeModel: Model<NodeDocument>) {}

  async create(createNodeDto: CreateNodeDto): Promise<Node> {
    // const createdNode = new this.nodeModel(createNodeDto);
    // return createdNode.save();
    console.log('Attempting to create node:', createNodeDto);
    const createdNode = new this.nodeModel(createNodeDto);
    console.log('Node instance created:', createdNode);
    const savedNode = await createdNode.save();
    console.log('Node saved:', savedNode);
    return savedNode;
  }

  async findById(id: string): Promise<Node> {
    return this.nodeModel.findById(id).exec();
  }

  async update(id: string, updateNodeDto: UpdateNodeDto): Promise<Node> {
    return this.nodeModel
      .findByIdAndUpdate(id, updateNodeDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Node> {
    return this.nodeModel.findByIdAndDelete(id).exec();
  }

  async findRoot(id: string): Promise<{ currentNode: Node; isRoot: boolean }> {
    const firstNode = await this.findById(id);
    let currentNode = firstNode;
    while (currentNode && currentNode.parentId) {
      currentNode = await this.findById(currentNode.parentId.toString());
    }
    if (firstNode === currentNode) {
      return { currentNode, isRoot: true };
    }
    return { currentNode, isRoot: false };
  }

  async addChild(parentId: string, childId: string): Promise<void> {
    const parent = await this.findById(parentId);
    if (!parent) {
      throw new BadRequestException('Parent node not found');
    }

    if (!parent.leftChild) {
      await this.nodeModel
        .findByIdAndUpdate(parentId, { leftChild: childId }, { new: true })
        .exec();
    } else if (!parent.rightChild) {
      await this.nodeModel
        .findByIdAndUpdate(parentId, { rightChild: childId }, { new: true })
        .exec();
    } else {
      throw new BadRequestException('Node already has two children');
    }
  }
}
