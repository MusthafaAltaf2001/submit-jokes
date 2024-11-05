import { Controller, Post, Body, Get } from '@nestjs/common';
import { JokesService } from './jokes.service';
// import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('')
export class JokesController {
    constructor(private readonly jokesService: JokesService) { }

    @Post()
    async createJoke(@Body() createJokeDto: { content: string; type: string }) {
        return this.jokesService.submitJoke(createJokeDto);
    }

    @Get()
    async allJokeTypes() {
        return this.jokesService.allJokeTypes();
    }
}
