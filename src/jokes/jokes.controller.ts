import { Controller, Post, Body } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('jokes')
export class JokesController {
    constructor(private readonly jokesService: JokesService) { }

    @Post()
    async createJoke(@Body() createJokeDto: { content: string; type: string }) {
        return this.jokesService.create(createJokeDto);
    }
}
