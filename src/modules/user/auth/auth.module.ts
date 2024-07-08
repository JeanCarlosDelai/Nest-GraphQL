import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/providers/typeORM/database.module';
import { UsersRepositoryContract } from '../domain/contracts/usersRepository.contract';
import { UsersRepository } from '../infra/repositories/implementation/usersRepository';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserProvider } from '../infra/providers/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { FindUserByIdService } from '../services/findUserById.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserProvider,
    FindUserByIdService,
    JwtStrategy,
    {
      provide: UsersRepositoryContract,
      useClass: UsersRepository,
    },
  ],
})

// eslint-disable-next-line prettier/prettier
export class AuthModule { }
