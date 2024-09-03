import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [JokesModule, MongooseModule.forRoot('mongodb+srv://musthafaaltaf2001:oMgInR4wdiBBv1XK@submitjoke.bjiyq.mongodb.net')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
