import { User } from '../../infra/entities/user.entity';
import { CreateUserInputDto } from '../dtos/createUserInput.dto';
import { UpdateUserInputDto } from '../dtos/updateUserInput.dto';

export abstract class UsersRepositoryContract {
  abstract findAll(): Promise<User[]>;
  abstract findByName(name: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(createUser: CreateUserInputDto): Promise<User>;
  abstract save(user: User): Promise<User>;
  abstract update(user: User, updateUser: UpdateUserInputDto): Promise<User>;
  abstract remove(user: User): Promise<boolean>;
}
