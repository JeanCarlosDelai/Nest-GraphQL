import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { AuthInputDto } from '../domain/dtos/authInput.dto';
import { AuthResponseDTO } from '../domain/dtos/authResponse.dto';

@Resolver('Auth')
export class AuthResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(private authService: AuthService) { }

  @Mutation(() => AuthResponseDTO)
  async auth(@Args('data') data: AuthInputDto): Promise<AuthResponseDTO> {
    return await this.authService.auth(data);
  }
}
