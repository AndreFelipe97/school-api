import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCoursesDto, UpdateCoursesDto } from 'src/dtos/Dto';
import { Courses } from 'src/entities/courses.entity';
import { CoursesService } from 'src/services/courses/courses.service';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async index(): Promise<Courses[]> {
    const users = await this.coursesService.findAll();

    return users;
  }

  @Get(':id')
  async indexId(@Param('id') id?: number): Promise<Courses[]> {
    const users = await this.coursesService.findAll(id);

    return users;
  }

  @Get('details/:id')
  async detail(@Param('id') id: number): Promise<Courses> {
    const user = await this.coursesService.findById(id);

    return user;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body()
    { name, description, registrations, cover, started }: CreateCoursesDto,
    @Res() response,
  ) {
    await this.coursesService.create({
      name,
      description,
      registrations,
      cover,
      started,
    });

    return response.status(204).send();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    { name, description, registrations, cover, started }: UpdateCoursesDto,
    @Res() response,
  ) {
    await this.coursesService.update(id, {
      name,
      description,
      registrations,
      cover,
      started,
    });

    return response.status(204).send();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response) {
    await this.coursesService.delete(id);

    return response.status(204).send();
  }
}
