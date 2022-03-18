import { PickType, InputType, ObjectType, Field } from '@nestjs/graphql';
import { MutationOutput } from '../../common/dtos/output.dto';

import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
