import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/modules/user/domain/dtos/createUser.dto';
import { UserInterface } from 'src/modules/user/domain/interfaces/user.interface';
import { User } from '../../entities/user.entity';
import { Inject } from '@nestjs/common';
import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';

export class UsersRepository implements UsersRepositoryContract {
  constructor(
    @Inject('USERS_REPOSITORY')
    private ormRepository: Repository<User>
    // eslint-disable-next-line prettier/prettier
  ) { }

  public async create(createUser: CreateUserDto): Promise<UserInterface> {
    const user = this.ormRepository.create(createUser);
    return await this.ormRepository.save(user);
  }

  public async save(user: UserInterface): Promise<UserInterface> {
    return await this.ormRepository.save(user);
  }

  public async findAll(): Promise<UserInterface[]> {
    return await this.ormRepository.find();
  }

  public async findByName(name: string): Promise<UserInterface | null> {
    return await this.ormRepository.findOneBy({
      name,
    });
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return await this.ormRepository.findOneBy({
      id,
    });
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return await this.ormRepository.findOneBy({
      email,
    });
  }

  public async remove(user: UserInterface): Promise<void> {
    await this.ormRepository.remove(user);
  }
}
