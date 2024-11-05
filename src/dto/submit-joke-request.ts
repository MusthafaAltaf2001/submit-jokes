import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class SubmitJokeRequest {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    type: string;
}
