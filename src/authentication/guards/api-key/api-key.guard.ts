import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
import { ApiKey } from '@src/api-key/entities/api-key.entity';
import { ApiKeyService } from '@src/api-key/api-key.service';
import { REQUEST_USER_KEY } from '@src/authentication/constants/authentication.constants';

export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    @InjectRepository(ApiKey)
    private readonly apiKeysRepository: Repository<ApiKey>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractKeyFromHeader(request);
    if (!apiKey) {
      throw new UnauthorizedException();
    }
    const extractedKey: string =
      this.apiKeyService.extractKeyFromApiKey(apiKey);
    try {
      const apiKeyEntity: ApiKey = await this.apiKeysRepository.findOne({
        where: { apiKey: extractedKey },
        relations: { user: true },
      });
      const {
        hashedKey,
        user: { id, email, role, permissions },
      } = apiKeyEntity;
      const isValidApiKey: boolean = await this.apiKeyService.validate(
        apiKey,
        hashedKey,
      );
      if (!isValidApiKey) {
        throw new UnauthorizedException();
      }
      request[REQUEST_USER_KEY] = {
        sub: id,
        email,
        role,
        permissions,
      } as ActiveUserData;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const [type, key] = request.headers.authorization?.split(' ') ?? [];
    return type === 'ApiKey' ? key : undefined;
  }
}
