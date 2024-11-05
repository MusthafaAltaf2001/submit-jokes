import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Joke } from './schemas/joke.schema';
import { Logger } from '@nestjs/common';
import { Model, Types, SaveOptions, Connection } from 'mongoose';
import { SubmitJokeRequest } from './dto/submit-joke-request';

export class JokesRepository<Joke> {
    protected readonly logger = new Logger(Joke.name);
    constructor(
        @InjectModel(Joke.name) private jokeModel: Model<Joke>,
        @InjectConnection() private connection: Connection
    ) { }

    async create(
        document: SubmitJokeRequest,
        options?: SaveOptions,
    ): Promise<Joke> {
        const createdDocument = new this.jokeModel({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createdDocument.save(options)).toJSON() as unknown as Joke;
    }
}
