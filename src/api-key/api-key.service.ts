import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { HashingService } from '@src/hashing/hashing.service';
import { GeneratedApiKeyPayload } from './interface/api-key-payload.interface';

@Injectable()
export class ApiKeyService {
  constructor(private readonly hashingService: HashingService) {}

  async createAndHash(key: string): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(key);
    const hashedKey = await this.hashingService.hash(apiKey);
    return { apiKey, hashedKey };
  }

  async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedKey);
  }

  extractKeyFromApiKey(apiKey: string): string {
    const [extractedKey] = Buffer.from(apiKey, 'base64')
      .toString('ascii')
      .split(' ');
    return extractedKey;
  }

  private generateApiKey(key: string): string {
    const apiKey = `${key} ${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }
}
