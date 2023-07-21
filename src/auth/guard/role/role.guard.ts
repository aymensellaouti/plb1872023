import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { User } from '../../../user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /* Vérifier que la personne authentifié posséde le role adéquat */

    /* Il me faut 2 choses : */
    /* Le user  */
    const request: Request = context.switchToHttp().getRequest();
    const user: User = request.user as User;
    const classe = context.getClass();
    const methode = context.getHandler();
    const allowedRoles = this.reflector.getAllAndMerge('roles', [
      classe,
      methode,
    ]);
    console.log({
      classe,
      methode,
      allowedRoles,
    });

    /* Les roles nécessaires  */
    return allowedRoles.includes(user.role);
  }
}
