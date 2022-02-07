import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceConfig } from './providers/broker/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configs = microserviceConfig;
  configs.options.consumer['allowAutoTopicCreation'] = true;

  app.connectMicroservice(configs);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  await app.startAllMicroservices();
  
  await app.listen(3000);
}
bootstrap();
