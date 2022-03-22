import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Dish } from '../restaurants/entities/dish.entity';

import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Restaurant, Dish])],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
