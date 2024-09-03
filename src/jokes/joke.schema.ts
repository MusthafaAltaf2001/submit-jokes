import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JokeDocument = Joke & Document;

@Schema()
export class Joke {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    type: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
