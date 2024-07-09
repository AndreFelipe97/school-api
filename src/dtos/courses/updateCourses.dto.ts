import { PartialType } from '@nestjs/swagger';
import { CreateCoursesDto } from './createCourses.dto';

export class UpdateCoursesDto extends PartialType(CreateCoursesDto) {}
