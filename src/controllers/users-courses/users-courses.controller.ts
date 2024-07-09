import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUsersCoursesDto, UpdateUsersCoursesDto } from 'src/dtos/Dto';
import { UsersCoursesService } from 'src/services/users-courses/users-courses.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('UsersCourses')
@Controller('users-courses')
export class UsersCoursesController {
  constructor(private readonly usersCoursesService: UsersCoursesService) {}

  @Get(':userId')
  async index(@Param('userId') userId: number) {
    const usersCourses =
      await this.usersCoursesService.findByCoursesWithUserIdWhenIsActive(
        userId,
      );

    return usersCourses;
  }

  @Post()
  async create(
    @Body() { courseId, userId }: CreateUsersCoursesDto,
    @Res() response,
  ) {
    await this.usersCoursesService.create({
      courseId,
      userId,
    });

    return response.status(204).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() { courseId, userId, registrationCanceled }: UpdateUsersCoursesDto,
    @Res() response,
  ) {
    await this.usersCoursesService.update({
      id,
      courseId,
      userId,
      registrationCanceled,
    });

    return response.status(204).send();
  }
}
