import { Module } from '@nestjs/common';
import { CreateUserResolver } from './resolvers/createUser.resolver';
import { CreateUserService } from './services/createUser.service';
import { UsersRepository } from './infra/repositories/implementation/usersRepository';
import { FindAllUsersResolver } from './resolvers/findAllUsers.resolver';
import { FindAllUsersService } from './services/findAllUsers.service';
import { DatabaseModule } from 'src/shared/providers/typeORM/database.module';
import { UserProvider } from './infra/providers/user.provider';
import { UsersRepositoryContract } from './domain/contracts/usersRepository.contract';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserProvider,
    CreateUserService,
    FindAllUsersService,
    CreateUserResolver,
    FindAllUsersResolver,
    {
      provide: UsersRepositoryContract,
      useClass: UsersRepository,
    },
  ],
})

// eslint-disable-next-line prettier/prettier
export class UserModule { }
