//   • POST /nodes: Insertar un nuevo nodo.
//   • PUT /nodes/:id: Editar un nodo existente.
//   • DELETE /nodes/:id: Eliminar un nodo y sus hijos.
//   • GET /nodes/root/:id: Obtener el nodo raíz desde un nodo dado.
//   • GET /nodes/:id: Obtener un nodo por su ID.

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Node } from './schema/node.schema';
import { Types } from 'mongoose';

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() createNodeDto: CreateNodeDto): Promise<Node> {
    return this.nodesService.create(createNodeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Node> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid node ID "${id}"`);
    }
    return this.nodesService.findNodeFromRoot(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNodeDto: UpdateNodeDto,
  ): Promise<Node> {
    return this.nodesService.update(id, updateNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.nodesService.delete(id);
  }

  @Get('root/:id')
  findRoot(@Param('id') id: string): Promise<Node> {
    return this.nodesService.findRoot(id);
  }
}
