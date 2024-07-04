import { CreateUserDto } from '../dtos/createUser.dto';
import { UserInterface } from '../interfaces/user.interface';

export abstract class UsersRepositoryContract {
  abstract findAll(): Promise<UserInterface[]>;
  abstract findByName(name: string): Promise<UserInterface | null>;
  abstract findById(id: string): Promise<UserInterface | null>;
  abstract findByEmail(email: string): Promise<UserInterface | null>;
  abstract create(createUserDTO: CreateUserDto): Promise<UserInterface>;
  abstract save(user: UserInterface): Promise<UserInterface>;
  abstract remove(user: UserInterface): Promise<void>;
}
