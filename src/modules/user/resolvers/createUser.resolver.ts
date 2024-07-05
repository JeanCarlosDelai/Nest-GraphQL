import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserService } from '../services/createUser.service';
import { CreateUserInputDto } from '../domain/dtos/createUserInput.dto';
import { User } from '../infra/entities/user.entity';

@Resolver('users')
export class CreateUserResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private createUserService: CreateUserService) { }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInputDto): Promise<User> {
    return await this.createUserService.createUser(data);
  }
}
