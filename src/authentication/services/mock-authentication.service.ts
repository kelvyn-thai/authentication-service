import { Injectable } from '@nestjs/common';
import { BaseAuthenticationService } from './base-authentication.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { IGenerateTokens } from '../interface/generate-tokens.interface';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class MockAuthenticationService implements BaseAuthenticationService {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    console.log(signUpDto);
    console.log('sign up method');
  }
  async signIn(signIn: SignInDto): Promise<IGenerateTokens> {
    console.log(signIn);
    return await this.refreshTokens({ refreshToken: 'refresh token request' });
  }
  async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<IGenerateTokens> {
    console.log(refreshTokenDto);
    return {
      refreshToken: 'Refresh token',
      accessToken: 'accessToken',
    };
  }
}
