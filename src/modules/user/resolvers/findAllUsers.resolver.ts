import { Query, Resolver } from '@nestjs/graphql';
import { UserRespondeDTO } from '../domain/dtos/userReponse.dto';
import { User } from '../infra/entities/user.entity';
import { FindAllUsersService } from '../services/findAllUsers.service';

@Resolver('User')
export class FindAllUsersResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private findAllUsersService: FindAllUsersService) { }

  @Query(() => [User])
  async findAllUsers(): Promise<UserRespondeDTO[]> {
    return await this.findAllUsersService.findAllUsers();
  }
}
