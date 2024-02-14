import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateApiKeyDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  apiKey: string;
}
