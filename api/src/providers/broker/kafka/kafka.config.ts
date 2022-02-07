import { KafkaOptions, Transport } from "@nestjs/microservices";

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      brokers: ['kafka:9092'],
      retry: {
        retries: 50,
        initialRetryTime: 1,
        maxRetryTime: 2000
      },
    },
    consumer: {
      groupId: 'api-consumer',
      retry: {
        retries: 50,
        maxRetryTime: 2000,
        initialRetryTime: 1
      }
    }
  }
}

export type Types = 'transactions'

export const topics = {
  transaction_result: 'transactions_result'
}