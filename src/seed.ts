import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodesService } from './nodes/nodes.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const nodesService = app.get(NodesService);

    // Crear nodo raíz
    const rootNode = await nodesService.create({ name: 'Root' });
    console.log('Root node created:', rootNode);

    // Crear hijos
    const child1 = await nodesService.create({
      name: 'Child 1',
      parentId: rootNode._id.toString(),
    });
    console.log('Child 1 created:', child1);

    const child2 = await nodesService.create({
      name: 'Child 2',
      parentId: rootNode._id.toString(),
    });
    console.log('Child 2 created:', child2);

    // Crear nietos
    const grandchild1 = await nodesService.create({
      name: 'Grandchild 1',
      parentId: child1._id.toString(),
    });
    console.log('Grandchild 1 created:', grandchild1);

    const grandchild2 = await nodesService.create({
      name: 'Grandchild 2',
      parentId: child2._id.toString(),
    });
    console.log('Grandchild 2 created:', grandchild2);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
