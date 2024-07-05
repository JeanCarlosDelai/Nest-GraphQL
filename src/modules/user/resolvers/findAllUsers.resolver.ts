import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../infra/entities/user.entity';
import { FindAllUsersService } from '../services/findAllUsers.service';

@Resolver('users')
export class FindAllUsersResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private findAllUsersService: FindAllUsersService) { }

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return await this.findAllUsersService.findAllUsers();
  }
}
