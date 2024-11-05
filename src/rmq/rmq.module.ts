import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { DELIVER_JOKES_QUEUE, SUBMIT_JOKES_QUEUE } from "src/utils/constants";

interface RmqModuleOptions {
    name: string;
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})

export class RmqModule {
    static register({ name }: RmqModuleOptions): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>('RABBIT_MQ_URI')],
                                queue: DELIVER_JOKES_QUEUE,
                                persistent: true,
                                queueOptions: {
                                    durable: false
                                }
                            }
                        }),
                        inject: [ConfigService]
                    }
                ])
            ],
            exports: [ClientsModule]
        }
    }
}