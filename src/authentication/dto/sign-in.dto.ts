import { i18nValidationMessage } from 'nestjs-i18n';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { I18nTranslations } from '@src/generated/i18n.generated';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>('validate.IS_EMAIL'),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validate.IS_NOT_EMPTY'),
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validate.IS_NOT_EMPTY'),
  })
  password: string;
}
