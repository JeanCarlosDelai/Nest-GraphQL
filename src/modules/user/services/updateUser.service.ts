import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';
import { User } from '../infra/entities/user.entity';
import { UpdateUserInputDto } from '../domain/dtos/updateUserInput.dto';
import {
  EMAIL_ALREADY_USED,
  USER_NOT_FOUND,
} from 'src/shared/consts/error.consts';

@Injectable()
export class UpdateUserService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async updateUser(id: string, updateUser: UpdateUserInputDto): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (updateUser.email) {
      const emailExists = await this.usersRepository.findByEmail(
        updateUser.email
      );

      if (emailExists) {
        throw new BadRequestException(EMAIL_ALREADY_USED);
      }
    }

    return await this.usersRepository.update(user, updateUser);
  }
}
