import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JokesModule } from './jokes.module';

async function bootstrap() {
  const app = await NestFactory.create(JokesModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
