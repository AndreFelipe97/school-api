import { IsBoolean, IsNumber } from 'class-validator';

export class CreateUsersCoursesDto {
  @IsNumber()
  readonly courseId: number;

  @IsNumber()
  readonly userId: number;

  @IsBoolean()
  readonly registrationCanceled?: boolean;
}
