import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JokeDocument = Joke & Document;

export enum JokeStatus {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Rejected = 'REJECTED',
}

@Schema()
export class Joke {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    type: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({
        required: true,
        enum: JokeStatus,
        default: JokeStatus.Pending
    })
    status: JokeStatus;

    @Prop({ default: "" })
    rejectionReason: string;
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
