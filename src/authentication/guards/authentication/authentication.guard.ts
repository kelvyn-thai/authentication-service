import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '@src/authentication/guards/access-token/access-token.guard';
import { AuthType } from '@src/authentication/enum/auth-type.enum';
import { AUTH_TYPE_KEY } from '@src/authentication/decorators/auth.decorators';
import { ApiKeyGuard } from '../api-key/api-key.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.ApiKey]: this.apiKeyGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];
    console.log('authTypes', authTypes);
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    console.log('guards', guards);
    let error = new UnauthorizedException();
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });
      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
