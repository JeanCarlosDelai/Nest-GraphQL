import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../domain/services/auth.service';
import { AuthInputDto } from '../domain/dtos/authInput.dto';
import { AuthDTO } from '../domain/dtos/auth.dto';

@Resolver('Auth')
export class AuthResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private authService: AuthService) { }

  @Mutation(() => AuthDTO)
  async auth(@Args('data') data: AuthInputDto): Promise<AuthDTO> {
    return await this.authService.auth(data);
  }
}
