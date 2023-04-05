import { NestFactory } from '@nestjs/core';
import { DaprModule } from './shared/dapr/dapr.module';
import { DaprService } from './shared/dapr/dapr.service';

async function bootstrap() {
  const app = await NestFactory.create(DaprModule);
  const subscriber = app.get(DaprService);
  await subscriber.start();
  await app.listen(3005);
}
bootstrap();
