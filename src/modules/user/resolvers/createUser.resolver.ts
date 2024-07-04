import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserService } from '../services/createUser.service';
import { CreateUserDto } from '../domain/dtos/createUser.dto';
import { UserRespondeDTO } from '../domain/dtos/userReponse.dto';
import { User } from '../infra/entities/user.entity';

@Resolver('User')
export class CreateUserResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private createUserService: CreateUserService) { }

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserDto
  ): Promise<UserRespondeDTO> {
    return await this.createUserService.createUser(data);
  }
}
