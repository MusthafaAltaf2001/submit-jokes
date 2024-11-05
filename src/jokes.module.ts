import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { Joke, JokeSchema } from './schemas/joke.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JokesRepository } from './jokes.repository';
import { RmqModule } from './rmq/rmq.module';
import { DELIVER_JOKES_SERVICE } from './utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './.env',
    }),
    // JokesModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
    RmqModule.register({
      name: DELIVER_JOKES_SERVICE
    })
  ],
  controllers: [JokesController],
  providers: [JokesService, JokesRepository],
})
export class JokesModule { }
