import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly birthdate: Date;
}
