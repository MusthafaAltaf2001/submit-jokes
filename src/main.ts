import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Microservice setup
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });
  app.enableCors()
  await app.startAllMicroservices();
  await app.listen(3005); // HTTP server running on port 3001
}

bootstrap();