import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { UserCourse } from 'src/entities/usersCourses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersCoursesService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
  ) { }

  async findByCoursesWithUserIdWhenIsActive(userId: number): Promise<UserCourse[]> {
    const userCourse = await this.userCourseRepository.find({
      where: {
        userId,
        registered: true,
        registrationCanceled: false
      }
    });

    return userCourse;
  }

  async create({ courseId, userId }): Promise<boolean> {
    const userCourseExists = await this.userCourseRepository.query(`
      select * from "usersCourses" uc 
      where "userId" = ${userId} and "courseId" = ${courseId}
    `);

    if (userCourseExists.length) {
      throw new BadRequestException("Você já está inscrito neste curso");
    }

    const userCourse = this.userCourseRepository.create({
      userId,
      courseId,
      registered: true,
      registrationCanceled: false,
    });

    await this.userCourseRepository.save(userCourse);

    return true;
  }

  async update({ id, userId, courseId, registrationCanceled }): Promise<boolean> {
    const userCourse = await this.userCourseRepository.preload({
      id,
      userId,
      courseId,
      registered: true,
      registrationCanceled,
    });

    if (!userCourse) {
      throw new NotFoundException('Inscrição não encontrada');
    }

    await this.userCourseRepository.save(userCourse);

    return true;
  }
}
