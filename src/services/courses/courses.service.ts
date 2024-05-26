import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courses } from 'src/entities/courses.entity';
import { courseAlreadyExists, courseNotFound } from 'src/messages/courses/messages';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private readonly coursesRepository: Repository<Courses>,
  ) { }

  async findAll(): Promise<Courses[]> {
    return await this.coursesRepository.find();
  }

  async findById(id: number): Promise<Courses> {
    const course = await this.coursesRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(courseNotFound);
    }

    return course;
  }

  async findByName(name: string): Promise<Courses> {
    return await this.coursesRepository.findOne({ where: { name } });
  }

  async create({ name, description, cover, registrations, started }): Promise<boolean> {
    const courseExists = await this.coursesRepository.findOne({ where: { name } });

    if (courseExists && courseExists.name.toLowerCase() === name.toLowerCase()) {
      throw new BadRequestException(courseAlreadyExists);
    }

    const course = this.coursesRepository.create({
      name,
      description,
      cover,
      registrations,
      started,
    });

    await this.coursesRepository.save(course);

    return true;
  }

  async update(id: number, { name, description, cover, registrations, started }): Promise<boolean> {
    const oldCourse = await this.coursesRepository.findOne({ where: { id } });
    const courseExists = await this.coursesRepository.findOne({ where: { name } });
    const course = await this.coursesRepository.preload({
      id,
      name: name || oldCourse.name,
      description: description || oldCourse.description,
      cover: cover || oldCourse.cover,
      registrations: registrations || oldCourse.registrations,
      started: started || oldCourse.started,
    });

    if (courseExists && courseExists.id !== id) {
      throw new NotFoundException(courseAlreadyExists);
    }

    if (!course) {
      throw new NotFoundException(courseNotFound);
    }

    await this.coursesRepository.save(course);

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const course = await this.coursesRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(courseNotFound);
    }

    await this.coursesRepository.delete({ id });

    return true;
  }
}
