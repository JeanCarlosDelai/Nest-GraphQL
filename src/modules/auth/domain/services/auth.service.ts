import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  INCORRECT_USER_OR_PASSWORD,
  USER_NOT_FOUND,
} from 'src/shared/consts/error.consts';
import { UsersRepositoryContract } from '../../../user/domain/contracts/usersRepository.contract';
import { compareSync } from 'bcrypt';
import { AuthDTO } from '../dtos/auth.dto';
import { AuthInputDto } from '../dtos/authInput.dto';
import { User } from '../../../user/infra/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepositoryContract,
    private jwtService: JwtService
    // eslint-disable-next-line prettier/prettier
  ) { }

  async auth(auth: AuthInputDto): Promise<AuthDTO> {
    const user = await this.usersRepository.findByEmail(auth.email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const validPassword = compareSync(auth.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException(INCORRECT_USER_OR_PASSWORD);
    }

    return {
      user,
      token: await this.generateJwtToken(user),
    };
  }

  private async generateJwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
