import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateCoursesDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  cover: string;
  @IsString()
  registrations: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly started: Date;
}
