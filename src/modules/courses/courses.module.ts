import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses/courses.controller';
import { Courses } from 'src/entities/courses.entity';
import { CoursesService } from 'src/services/courses/courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Courses]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
