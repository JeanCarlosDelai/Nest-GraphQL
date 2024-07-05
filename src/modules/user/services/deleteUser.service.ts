import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';

@Injectable()
export class DeleteUserService {
  constructor(
    private usersRepository: UsersRepositoryContract
    // eslint-disable-next-line prettier/prettier
  ) { }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersRepository.remove(user);
  }
}
