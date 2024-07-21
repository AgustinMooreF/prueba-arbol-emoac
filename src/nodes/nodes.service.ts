import { Injectable, NotFoundException } from '@nestjs/common';
import { NodesRepository } from './nodes.repository';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Node } from './schema/node.schema';
import { Types } from 'mongoose';

@Injectable()
export class NodesService {
  constructor(private readonly nodesRepository: NodesRepository) {}

  async create(createNodeDto: CreateNodeDto): Promise<Node> {
    const node = await this.nodesRepository.create(createNodeDto);
    if (createNodeDto.parentId) {
      try {
        await this.nodesRepository.addChild(
          createNodeDto.parentId,
          node._id.toString(),
        );
      } catch (error) {
        await this.nodesRepository.delete(node._id.toString());
        throw error;
      }
    }
    return node;
  }

  async findById(id: string): Promise<Node> {
    const node = await this.nodesRepository.findById(id);
    if (!node) {
      throw new NotFoundException(`Node with ID "${id}" not found`);
    }
    return node;
  }

  async update(id: string, updateNodeDto: UpdateNodeDto): Promise<Node> {
    const updatedNode = await this.nodesRepository.update(id, updateNodeDto);
    if (!updatedNode) {
      throw new NotFoundException(`Node with ID "${id}" not found`);
    }
    return updatedNode;
  }

  async delete(id: string): Promise<void> {
    const deletedNode = await this.nodesRepository.delete(id);
    if (!deletedNode) {
      throw new NotFoundException(`Node with ID "${id}" not found`);
    }
    if (deletedNode.leftChild) {
      await this.delete(deletedNode.leftChild.toString());
    }
    if (deletedNode.rightChild) {
      await this.delete(deletedNode.rightChild.toString());
    }
  }

  async findRoot(id: string): Promise<Node> {
    const { currentNode: root, isRoot } =
      await this.nodesRepository.findRoot(id);
    if (isRoot) {
      throw new NotFoundException(`Node already root node"`);
    }
    if (!root) {
      throw new NotFoundException(`Root node not found for node "${id}"`);
    }
    return root;
  }

  async findNodeFromRoot(targetId: string): Promise<Node | null> {
    if (!Types.ObjectId.isValid(targetId)) {
      throw new NotFoundException(`Invalid node ID "${targetId}"`);
    }
    const root = await this.findRoot(targetId);
    const rootId = root._id.toString();
    if (!root) {
      throw new NotFoundException(`Root node with ID "${rootId}" not found`);
    }
    const search = async (nodeId: string): Promise<Node | null> => {
      if (!nodeId) return null;

      const node = await this.findById(nodeId);
      if (!node) return null;

      if (node._id.toString() === targetId) return node;

      const leftResult = await search(node.leftChild?.toString());
      if (leftResult) return leftResult;

      return search(node.rightChild?.toString());
    };

    return search(rootId);
  }
}
