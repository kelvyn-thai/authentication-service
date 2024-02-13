import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@src/authorization/decorators/permission.decorator';
import {
  Permission,
  PermissionType,
} from '@src/authorization/types/permissions.type';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
import { REQUEST_USER_KEY } from '@src/authentication/constants/authentication.constants';

@Injectable()
export class PermisisonGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!contextPermissions) {
      return true;
    }
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return contextPermissions.every(
      (permission: Permission) => user.permissions?.includes(permission),
    );
  }
}
