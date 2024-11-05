import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { DELIVER_JOKES_QUEUE } from "src/utils/constants";

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) { }

    getOptions(): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: DELIVER_JOKES_QUEUE,
                persistent: true,
                queueOptions: {
                    durable: false
                }
            }
        }
    }
}