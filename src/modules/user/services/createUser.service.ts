import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../domain/dtos/createUser.dto';
import UserResponseMapper from '../domain/mappings/UserResponseMapper';
import { UserRespondeDTO } from '../domain/dtos/userReponse.dto';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async createUser(createUser: CreateUserDto): Promise<UserRespondeDTO> {
    const emailExists = await this.usersRepository.findByEmail(
      createUser.email
    );

    if (emailExists) {
      throw new BadRequestException('EMAIL_ALREADY_USED');
    }

    const response = await this.usersRepository.create(createUser);

    return UserResponseMapper.response(response);
  }
}
