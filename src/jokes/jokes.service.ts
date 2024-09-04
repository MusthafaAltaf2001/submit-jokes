import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke, JokeDocument, JokeStatus } from './joke.schema';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class JokesService {
    private client: ClientProxy;

    constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { host: '127.0.0.1', port: 3001 },
        });
    }

    async create(createJokeDto: { content: string; type: string }): Promise<Joke> {
        const createdJoke = new this.jokeModel(createJokeDto);
        return createdJoke.save();
    }


    async findAll(): Promise<Joke[]> {
        return this.jokeModel.find().exec();
    }


    async approveJoke(id: string) {
        console.log(id)
        return this.jokeModel.findByIdAndUpdate(id, { status: JokeStatus.Pending });
    }
}
