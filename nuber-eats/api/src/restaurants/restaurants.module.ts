import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver,
} from './restaurants.resolver';

import { Restaurant } from './entities/restaurant.entity';
import { Dish } from './entities/dish.entity';
import { CategoryRepository } from './repositories/category.repository';

import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Dish, CategoryRepository])],
  providers: [
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
    RestaurantService,
  ],
})
export class RestaurantsModule {}
