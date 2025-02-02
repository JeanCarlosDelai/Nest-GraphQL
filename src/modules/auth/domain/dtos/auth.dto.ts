import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/infra/entities/user.entity';

@ObjectType()
export class AuthDTO {
  @Field(() => User)
  readonly user: User;

  @Field()
  readonly token: string;
}
