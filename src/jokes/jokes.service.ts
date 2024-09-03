import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke, JokeDocument } from './joke.schema';

@Injectable()
export class JokesService {
    constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) { }

    async create(createJokeDto: { content: string; type: string }): Promise<Joke> {
        const createdJoke = new this.jokeModel(createJokeDto);
        return createdJoke.save();
    }
}
