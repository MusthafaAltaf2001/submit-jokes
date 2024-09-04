import { Controller, Post, Body, Get } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('jokes')
export class JokesController {
    constructor(private readonly jokesService: JokesService) { }

    @Post()
    async createJoke(@Body() createJokeDto: { content: string; type: string }) {
        return this.jokesService.create(createJokeDto);
    }

    @MessagePattern({ cmd: 'get-all-jokes' })
    async findAll() {
        return this.jokesService.findAll();
    }

    @MessagePattern({ cmd: 'approve-joke' })
    async approveJoke(@Payload() id: string) {
        return this.jokesService.approveJoke(id);
    }
}
