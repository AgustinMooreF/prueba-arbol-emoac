import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { NodesRepository } from './nodes.repository';
import { Node, NodeSchema } from './schema/node.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  controllers: [NodesController],
  providers: [NodesService, NodesRepository],
})
export class NodesModule {}
