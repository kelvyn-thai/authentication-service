import { Injectable } from '@nestjs/common';
import { SignUpDto } from '@src/authentication/dto/sign-up.dto';
import { SignInDto } from '@src/authentication/dto/sign-in.dto';
import { IGenerateTokens } from '@src/authentication/interface/generate-tokens.interface';
import { RefreshTokenDto } from '@src/authentication/dto/refresh-token.dto';

@Injectable()
export abstract class BaseAuthenticationService {
  abstract signUp(signUpDto: SignUpDto): Promise<void>;

  abstract signIn(signIn: SignInDto): Promise<IGenerateTokens>;

  abstract refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<IGenerateTokens>;
}
