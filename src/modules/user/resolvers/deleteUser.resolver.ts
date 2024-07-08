import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteUserService } from '../services/deleteUser.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/shared/guards/auth.guard';

@Resolver('User')
export class DeleteUserResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private deleteUserService: DeleteUserService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.deleteUserService.deleteUser(id);
  }
}
