import { IsEmail, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@src/generated/i18n.generated';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneByDto {
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
}
