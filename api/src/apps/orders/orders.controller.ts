import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDTO } from 'src/common/dto/orders/create-order.dto';
import { ListOdersDTO } from 'src/common/dto/orders/list-orders.dto';
import { topics } from 'src/providers/broker/kafka/kafka.config';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(
    @Req() req: any,
    @Body() dto: CreateOrderDTO
  ) {
    return this.ordersService.create(req.user.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(
    @Req() req: any,
    @Query() dto: ListOdersDTO
  ) {
    return this.ordersService.getOrders(req.user.id, dto);
  }

  @MessagePattern(topics.transaction_result)
  updateOrders({ value }: { value: any }) {
    console.log(value);
  }
}
