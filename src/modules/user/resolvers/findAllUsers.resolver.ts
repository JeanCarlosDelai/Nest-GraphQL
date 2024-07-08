import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../infra/entities/user.entity';
import { FindAllUsersService } from '../services/findAllUsers.service';
import { GqlAuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('users')
export class FindAllUsersResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private findAllUsersService: FindAllUsersService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return await this.findAllUsersService.findAllUsers();
  }
}
