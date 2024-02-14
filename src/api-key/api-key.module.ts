import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { HashingService } from '@src/hashing/hashing.service';
import { BcryptService } from '@src/hashing/brypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  controllers: [ApiKeyController],
  providers: [
    ApiKeyService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class ApiKeyModule {}
