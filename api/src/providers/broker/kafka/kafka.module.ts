import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { microserviceConfig } from "./kafka.config";
import { KafkaService } from "./kafka.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        ...microserviceConfig,
        name: 'KAFKA_SERVICE'
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService]
})
export class KafkaModule {}