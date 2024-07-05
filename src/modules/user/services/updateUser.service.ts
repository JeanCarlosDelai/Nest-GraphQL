import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';
import { User } from '../infra/entities/user.entity';
import { UpdateUserInputDto } from '../domain/dtos/updateUserInput.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async updateUser(id: string, updateUser: UpdateUserInputDto): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUser.email) {
      const emailExists = await this.usersRepository.findByEmail(
        updateUser.email
      );

      if (emailExists) {
        throw new BadRequestException('EMAIL_ALREADY_USED');
      }
    }

    return await this.usersRepository.update(user, updateUser);
  }
}
