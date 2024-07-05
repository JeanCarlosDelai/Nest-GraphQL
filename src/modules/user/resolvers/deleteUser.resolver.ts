import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteUserService } from '../services/deleteUser.service';

@Resolver('users')
export class DeleteUserResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private deleteUserService: DeleteUserService) { }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.deleteUserService.deleteUser(id);
  }
}
