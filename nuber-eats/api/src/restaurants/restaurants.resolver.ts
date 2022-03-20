import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';

import { RestaurantService } from './restaurants.service';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';

import { Role } from '../auth/role.decorator';
import { AuthUser } from '../auth/auth-user.decorator';
@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateRestaurantOutput)
  @Role(['Owner'])
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input')
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }
}
