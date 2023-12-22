import { Module } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { BcryptService } from 'src/hashing/brypt.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
