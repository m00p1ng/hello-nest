import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';

import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteRestaurantInput {
  @Field(() => Int)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput {}
