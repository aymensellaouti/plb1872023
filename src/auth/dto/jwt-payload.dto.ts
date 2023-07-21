import { UserRoleEnum } from '../../user/entities/user.entity';

export class JwtPayloadDto {
  username: string;
  role: UserRoleEnum;
  email: string;
}
