import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';
import { CreateUserDto } from 'src/modules/user/domain/dtos/createUser.dto';
import { UserInterface } from 'src/modules/user/domain/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export class UsersRepositoryInMemory implements UsersRepositoryContract {
  private users: UserInterface[] = [];

  async findAll(): Promise<UserInterface[]> {
    return this.users;
  }

  async findByName(name: string): Promise<UserInterface | null> {
    const user = this.users.find(user => user.name === name);
    return user || null;
  }

  async findById(id: string): Promise<UserInterface | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = this.users.find(user => user.email === email);
    return user || null;
  }

  async create(createUserDTO: CreateUserDto): Promise<UserInterface> {
    const user: UserInterface = {
      id: uuidv4(),
      ...createUserDTO,
      // created_at: new Date(),
      // updated_at: new Date(),
    };
    const newUser = await this.save(user);
    return newUser;
  }

  async save(user: UserInterface): Promise<UserInterface> {
    this.users.push(user);
    return user;
  }

  async remove(user: UserInterface): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
