import { PartialType } from '@nestjs/swagger';
import { CreateUsersCoursesDto } from './createUsersCourses.dto';

export class UpdateUsersCoursesDto extends PartialType(CreateUsersCoursesDto) {}
