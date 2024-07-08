import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/infra/entities/user.entity';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import { UNAUTHORIZED } from 'src/shared/consts/error.consts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private findUserByIdService: FindUserByIdService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: User['id']; name: string }): Promise<User> {
    const user = this.findUserByIdService.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED);
    }
    return user;
  }
}
