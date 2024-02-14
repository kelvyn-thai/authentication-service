import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthType } from '@src/authentication/enum/auth-type.enum';
import { ApiKeyService } from './api-key.service';
import { Auth } from '@src/authentication/decorators/auth.decorators';
import { CreateApiKeyDTO } from './dto/create-api-key.dto';
import { GeneratedApiKeyPayload } from './interface/api-key-payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-key.entity';
import { REQUEST_USER_KEY } from '@src/authentication/constants/authentication.constants';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';

@Auth(AuthType.Bearer)
@Controller('api-key')
export class ApiKeyController {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createApiKeyDTO: CreateApiKeyDTO,
    @Req() request: Request,
  ): Promise<GeneratedApiKeyPayload> {
    try {
      const { sub }: ActiveUserData = request[REQUEST_USER_KEY];
      const { apiKey }: CreateApiKeyDTO = createApiKeyDTO;
      const generated: GeneratedApiKeyPayload =
        await this.apiKeyService.createAndHash(apiKey);
      await this.apiKeyRepository.save({
        apiKey,
        hashedKey: generated.hashedKey,
        user: {
          id: sub,
        },
      });
      return generated;
    } catch (error) {
      throw error;
    }
  }
}
