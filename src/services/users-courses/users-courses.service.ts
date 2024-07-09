import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from 'src/entities/usersCourses.entity';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import {
  registerNotFound,
  youAreAlreadyRegistered,
} from 'src/messages/usersCourses/messages';

@Injectable()
export class UsersCoursesService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    private readonly courseService: CoursesService,
  ) {}

  async findByCoursesWithUserIdWhenIsActive(
    userId: number,
  ): Promise<UserCourse[]> {
    const userCourse = await this.userCourseRepository.query(`
      select c.id, c.name, c.description, c.cover, c.started, c.registrations, uc.registered, ${'uc."registrationCanceled"'} from "usersCourses" uc 
      left join courses c 
      on c.id = "courseId" 
      where "userId" = ${userId}  and "registered" = true and "registrationCanceled" = false
    `);

    return userCourse;
  }

  async create({ courseId, userId }): Promise<boolean> {
    const userCourseExists = await this.userCourseRepository.query(`
      select * from "usersCourses" uc 
      where "userId" = ${userId} and "courseId" = ${courseId}
    `);

    if (userCourseExists.length) {
      throw new BadRequestException(youAreAlreadyRegistered);
    }

    const userCourse = this.userCourseRepository.create({
      userId,
      courseId,
      registered: true,
      registrationCanceled: false,
    });

    await this.userCourseRepository.save(userCourse);

    const course = await this.courseService.findById(courseId);

    await this.courseService.update(courseId, {
      ...course,
      registrations: course.registrations + 1,
    });

    return true;
  }

  async update({
    id,
    userId,
    courseId,
    registrationCanceled,
  }): Promise<boolean> {
    const userCourse = await this.userCourseRepository.preload({
      id,
      userId,
      courseId,
      registered: true,
      registrationCanceled,
    });

    if (!userCourse) {
      throw new NotFoundException(registerNotFound);
    }

    await this.userCourseRepository.save(userCourse);

    return true;
  }
}
