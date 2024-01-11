import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@src/generated/i18n.generated';
import { CreateUserDto } from '@src/users/dto/create-user.dto';

export class SignUpDto extends PickType(CreateUserDto, ['email', 'password']) {
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

  @MinLength(8)
  @MaxLength(64)
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validate.IS_NOT_EMPTY'),
  })
  password: string;
}
