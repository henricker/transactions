import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from 'src/entities/orders/order.repository';
import { KafkaModule } from 'src/providers/broker/kafka/kafka.module';
import { KafkaService } from 'src/providers/broker/kafka/kafka.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    KafkaModule
  ]
})
export class OrdersModule {}
