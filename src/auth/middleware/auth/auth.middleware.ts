import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { JwtPayload, verify } from 'jsonwebtoken';
import { SECRET } from '../../../common/config/constantes';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const jwtToken = req.get('auth-user');
    if (!jwtToken)
      throw new UnauthorizedException('Veuillez vous authentifiez');
    else {
      // TODO : Verifier le JWT Token
      try {
        let jwt: JwtPayload | string = verify(jwtToken, SECRET);
        req['userId'] = jwt['userId'];
        next();
      } catch (e) {
        throw new UnauthorizedException('Veuillez vous authentifiez');
      }
    }
  }
}
