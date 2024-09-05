import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke, JokeDocument, JokeStatus } from './joke.schema';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class JokesService {
    private client: ClientProxy;

    constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { host: '127.0.0.1', port: 3002 },
        });
    }

    async create(createJokeDto: { content: string; type: string }): Promise<Joke> {
        const createdJoke = new this.jokeModel(createJokeDto);
        return createdJoke.save();
    }


    async findAll(): Promise<Joke[]> {
        return this.jokeModel.find().exec();
    }


    async approveJoke(id: string, content: string, type: string) {
        return this.jokeModel.findByIdAndUpdate(id, {
            content: content,
            type: type,
            status: JokeStatus.Approved
        });
    }

    async rejectJoke(id: string) {
        return this.jokeModel.findByIdAndUpdate(id, {
            status: JokeStatus.Rejected
        });
    }

    async getJokeTypes() {
        // Get all joke types
        return this.client.send({ cmd: 'get-joke-types' }, {});
    }
}
