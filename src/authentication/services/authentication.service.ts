import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { HashingService } from '@src/hashing/hashing.service';
import { User } from '@src/users/entities/user.entity';
import jwtConfig from '@src/config/jwt.config';
import { RefreshTokenDto } from '@src/authentication/dto/refresh-token.dto';
import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from '@src/authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { SignInDto } from '@src/authentication/dto/sign-in.dto';
import { SignUpDto } from '@src/authentication/dto/sign-up.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@src/generated/i18n.generated';
import { IGenerateTokens } from '@src/authentication/interface/generate-tokens.interface';
import { BaseAuthenticationService } from './base-authentication.service';

@Injectable()
export class AuthenticationService implements BaseAuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(RefreshTokenIdsStorage)
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    @Inject(I18nService<I18nTranslations>)
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      await this.usersRepository.save(user);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto): Promise<IGenerateTokens> {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t('translate.USER_DOES_NOT_EXISTS', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException(
        this.i18n.t('translate.PASSWORD_DOES_NOT_MATCH', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<IGenerateTokens> {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user: User = await this.usersRepository.findOneByOrFail({
        id: sub,
      });
      const isValid: boolean = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is invalid');
      }
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // Take action: notify user that his refresh token might have been stolen?
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
