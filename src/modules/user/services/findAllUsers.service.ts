import { Injectable } from '@nestjs/common';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';
import { User } from '../infra/entities/user.entity';

@Injectable()
export class FindAllUsersService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }
}
