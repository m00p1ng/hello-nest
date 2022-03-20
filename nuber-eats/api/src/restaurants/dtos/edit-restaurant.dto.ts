import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  Int,
} from '@nestjs/graphql';

import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateRestaurantInput } from './create-restaurant.dto';

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => Int)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}
