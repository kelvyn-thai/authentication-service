import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '@src/users/enums/role.enum';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
import { REQUEST_USER_KEY } from '@src/authentication/constants/authentication.constants';
import { ROLES_KEY } from '@src/authorization/decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!contextRoles) {
      return true;
    }
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    console.log('user', user);
    return contextRoles.some((role) => user.role === role);
  }
}
