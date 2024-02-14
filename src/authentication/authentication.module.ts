import { Module } from '@nestjs/common';
import { HashingService } from '@src/hashing/hashing.service';
import { BcryptService } from '@src/hashing/brypt.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage/refresh-token-ids.storage';
import { BaseAuthenticationService } from './services/base-authentication.service';
import { MockAuthenticationService } from './services/mock-authentication.service';
import 'dotenv/config';
// import { RolesGuard } from '@src/authorization/roles/roles.guard';
// import { PermisisonGuard } from '@src/authorization/permission/permission.guard';
import { PoliciesGuard } from '@src/authorization/guard/policies.guard';
import { PolicyHandlerStorage } from '@src/authorization/storage/policy-handlers.storage';
import { CarehealthUserPolicyHandler } from '@src/authorization/policy/carehealth-user.policy';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ApiKey } from '@src/api-key/entities/api-key.entity';
import { ApiKeyService } from '@src/api-key/api-key.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ApiKey]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      // useClass: RolesGuard,
      // useClass: PermisisonGuard,
      useClass: PoliciesGuard,
    },
    RefreshTokenIdsStorage,
    AccessTokenGuard,
    ApiKeyGuard,
    ApiKeyService,
    {
      provide: BaseAuthenticationService,
      useClass:
        process.env.AUTH_SERVICE === 'mock'
          ? MockAuthenticationService
          : AuthenticationService,
    },
    PolicyHandlerStorage,
    CarehealthUserPolicyHandler,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
