import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from 'src/common/dto/orders/create-order.dto';
import { OrdersRepository } from 'src/entities/orders/order.repository';
import { ListOdersDTO } from 'src/common/dto/orders/list-orders.dto';
import { KafkaService } from 'src/providers/broker/kafka/kafka.service';
import * as crypto from 'crypto';

@Injectable()
export class OrdersService {

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async create(userId: number, dto: CreateOrderDTO) {
  
    const orderSaved = await this.ordersRepository.save({
      account_id: userId,
      ...dto
    })

    this.kafkaService.notify({
      to: 'transactions',
      message: JSON.stringify({
        id: orderSaved.id,
        account_id: orderSaved.account_id,
        credit_card_name: orderSaved.credit_card_name,
        credit_card_number: orderSaved.credit_card_number,
        credit_card_expiration_month: orderSaved.credit_card_expiration_month,
        credit_card_expiration_year: orderSaved.credit_card_expiration_year,
        credit_card_cvv: orderSaved.credit_card_cvv,
        ammount: orderSaved.amount
      })
    })

    delete orderSaved.credit_card_number
    delete orderSaved.credit_card_cvv

    return orderSaved
  }

  async getOrders(accountId: number, dto: ListOdersDTO) {
    return this.ordersRepository.find({
      where: {
        account_id: accountId
      },
      select: ['id', 'status', 'amount', 'credit_card_name', 'account_id'],
      skip: ((dto.page - 1) * dto.limit),
      take: dto.limit
    })
  }

}
