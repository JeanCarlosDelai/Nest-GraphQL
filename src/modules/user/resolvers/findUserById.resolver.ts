import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../infra/entities/user.entity';
import { FindUserByIdService } from '../services/findUserById.service';
import { GqlAuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('users')
export class FindUserByIdResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private findUserByIdService: FindUserByIdService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    return await this.findUserByIdService.findUserById(id);
  }
}
