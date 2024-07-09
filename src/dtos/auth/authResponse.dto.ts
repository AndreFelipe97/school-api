import { IsNumber, IsString } from 'class-validator';

export class AuthResponseDto {
  @IsString()
  readonly token: string;
  @IsNumber()
  readonly expiresIn: number;
}
