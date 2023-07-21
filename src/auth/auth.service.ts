import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  async login(loginDto: LoginDto): Promise<{ jwt: string }> {
    /* 
     Récupérer les données d’authentification de vos utilisateurs.
     Vérifier que l’utilisateur existe via son identifiant. 
    Récupérer le mot de passe envoyé et vérifier qu’il correspond bien au mot de passe sauvegardé dans la base de données. 
    Si c’est le cas, authentifier votre utilisateur, sinon retourner une UnauthorizedException.
    */
    const { password, username } = loginDto;
    const user = await this.userService.findUserWithUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const isLoggedIn = await compare(password, user.password);
    if (!isLoggedIn) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const payload: JwtPayloadDto = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);

    return { jwt };
  }
}
