import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Inject } from '@nestjs/common';
import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';
import { CreateUserInputDto } from 'src/modules/user/domain/dtos/createUserInput.dto';
import { UpdateUserInputDto } from 'src/modules/user/domain/dtos/updateUserInput.dto';

export class UsersRepository implements UsersRepositoryContract {
  constructor(
    @Inject('USERS_REPOSITORY')
    private ormRepository: Repository<User>
    // eslint-disable-next-line prettier/prettier
  ) { }

  public async create(createUser: CreateUserInputDto): Promise<User> {
    const user = this.ormRepository.create(createUser);
    return await this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async update(
    user: User,
    updateUser: UpdateUserInputDto
  ): Promise<User> {
    await this.ormRepository.update(user, {
      ...updateUser,
    });
    return this.ormRepository.create({ ...user, ...updateUser });
  }

  public async findAll(): Promise<User[]> {
    return await this.ormRepository.find();
  }

  public async findByName(name: string): Promise<User | null> {
    return await this.ormRepository.findOneBy({
      name,
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await this.ormRepository.findOneBy({
      id,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepository.findOneBy({
      email,
    });
  }

  public async remove(user: User): Promise<boolean> {
    const deleted = await this.ormRepository.remove(user);
    if (deleted) return true;
    return false;
  }
}
