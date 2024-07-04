import { Injectable } from '@nestjs/common';
import UserResponseMapper from '../domain/mappings/UserResponseMapper';
import { UserRespondeDTO } from '../domain/dtos/userReponse.dto';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';

@Injectable()
export class FindAllUsersService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async findAllUsers(): Promise<UserRespondeDTO[]> {
    const users = await this.usersRepository.findAll();

    return users.map(user => UserResponseMapper.response(user));
  }
}
