import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGenders } from '@src/users/entities/user.entity';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@src/generated/i18n.generated';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  username?: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @IsStrongPassword()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validate.IS_NOT_EMPTY'),
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty()
  @MaxLength(255)
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
  @IsEnum(UserGenders)
  gender?: UserGenders;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fullname?: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth?: Date;

  @ApiProperty()
  @IsString()
  avatar?: string;
}
