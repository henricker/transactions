import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Producer } from "@nestjs/microservices/external/kafka.interface";
import { topics, Types } from "./kafka.config";

export type IMessage = {
  to: Types,
  message: string
}

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka
  ){}

  async onModuleInit() {
    Object.values(topics).forEach(microService => {
      this.kafkaClient.subscribeToResponseOf(microService)
    })
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  async notify(content: IMessage): Promise<boolean> {
    const [kafkaResponse] = await this.kafkaProducer.send({
      topic: content.to,
      messages: [{ key: String(Math.random()), value: content.message }],
      acks: -1
    })
    
    return kafkaResponse?.errorCode === 0 ? true : false;
  }

  async notifyWithResponse(content: IMessage): Promise<any> {
    return await this.kafkaClient.send(content.to, content.message).toPromise();
  }

}