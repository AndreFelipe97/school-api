import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCoursesController } from 'src/controllers/users-courses/users-courses.controller';
import { UserCourse } from 'src/entities/usersCourses.entity';
import { UsersCoursesService } from 'src/services/users-courses/users-courses.service';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([UserCourse])],
  controllers: [UsersCoursesController],
  exports: [UsersCoursesService],
  providers: [UsersCoursesService],
})
export class UsersCoursesModule {}
