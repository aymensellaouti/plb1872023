import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET',
    });
  }
  // La payloadInterface sert à typer votre code à vous de la créer selon votre payload
  async validate(payload: JwtPayloadDto) {
    // validate jwt ce qu'on retourne ici ca va etre injecté dans la requete
    const { username } = payload;
    const user = this.userService.findUserWithUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    return user;
  }
}
