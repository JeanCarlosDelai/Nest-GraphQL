import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '../domain/dtos/createUserInput.dto';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';
import { User } from '../infra/entities/user.entity';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/error.consts';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async createUser(createUser: CreateUserInputDto): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(
      createUser.email
    );

    if (emailExists) {
      throw new BadRequestException(EMAIL_ALREADY_USED);
    }

    return await this.usersRepository.create(createUser);
  }
}
