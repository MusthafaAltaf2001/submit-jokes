import { Injectable, Inject } from '@nestjs/common';
import { Joke } from './schemas/joke.schema';
import { JokesRepository } from './jokes.repository';
import { SubmitJokeRequest } from './dto/submit-joke-request';
import { ClientProxy } from '@nestjs/microservices';
import { DELIVER_JOKES_SERVICE } from './utils/constants';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JokesService {
    constructor(
        private readonly jokesRepository: JokesRepository<Joke>,
        @Inject(DELIVER_JOKES_SERVICE) private deliverJokesClient: ClientProxy
    ) { }

    async submitJoke(submitJokeRequest: SubmitJokeRequest) {
        const joke = await this.jokesRepository.create(submitJokeRequest)
        return joke
    }

    async allJokeTypes() {
        // Get all joke types
        const allJokeTypes = await lastValueFrom(this.deliverJokesClient
            .send({ cmd: 'all_joke_types' }, {})
        )
        return allJokeTypes
    }
}
