import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ jwt: string }> {
    return this.authService.login(loginDto);
  }
}
