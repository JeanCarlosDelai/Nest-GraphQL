import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../infra/entities/user.entity';
import { UpdateUserService } from '../services/updateUser.service';
import { UpdateUserInputDto } from '../domain/dtos/updateUserInput.dto';

@Resolver('users')
export class UpdateUserResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private updateUserService: UpdateUserService) { }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInputDto
  ): Promise<User> {
    return await this.updateUserService.updateUser(id, data);
  }
}
