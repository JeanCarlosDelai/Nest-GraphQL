import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';
import { User } from '../infra/entities/user.entity';
import { USER_NOT_FOUND } from 'src/shared/consts/error.consts';

@Injectable()
export class FindUserByIdService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }
}
