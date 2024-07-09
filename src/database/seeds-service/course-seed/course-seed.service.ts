import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/services/courses/courses.service';

@Injectable()
export class CourseSeedService {
  constructor(private readonly coursesService: CoursesService) {}

  async create() {
    const course1 = await this.coursesService.findByName(
      'Desenvolvimento Web com React e Next.js',
    );
    const course2 = await this.coursesService.findByName(
      'Introdução à Inteligência Artificial',
    );
    const course3 = await this.coursesService.findByName(
      'Fotografia para Iniciantes',
    );
    const course4 = await this.coursesService.findByName(
      'Inglês Instrumental para o Mercado de Trabalho',
    );
    const course5 = await this.coursesService.findByName(
      'Finanças Pessoais para Iniciantes',
    );
    const course6 = await this.coursesService.findByName(
      'Culinária Vegetariana',
    );
    const course7 = await this.coursesService.findByName(
      'Yoga para Iniciantes',
    );
    const course8 = await this.coursesService.findByName(
      'Produtividade Pessoal',
    );

    if (
      course1 ||
      course2 ||
      course3 ||
      course4 ||
      course5 ||
      course6 ||
      course7 ||
      course8
    ) {
      return;
    }

    await this.coursesService.create({
      name: 'Desenvolvimento Web com React e Next.js',
      description:
        'Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.',
      cover: 'https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg',
      registrations: 0,
      started: new Date(2024, 5, 20),
    });

    await this.coursesService.create({
      name: 'Introdução à Inteligência Artificial',
      description:
        'Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.',
      cover:
        'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg',
      registrations: 0,
      started: new Date(2024, 6, 15),
    });

    await this.coursesService.create({
      name: 'Fotografia para Iniciantes',
      description:
        'Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.',
      cover: 'https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg',
      registrations: 0,
      started: new Date(2024, 7, 10),
    });

    await this.coursesService.create({
      name: 'Inglês Instrumental para o Mercado de Trabalho',
      description:
        'Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.',
      cover: 'https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg',
      registrations: 0,
      started: new Date(2024, 8, 5),
    });

    await this.coursesService.create({
      name: 'Finanças Pessoais para Iniciantes',
      description:
        'Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.',
      cover: 'https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg',
      registrations: 0,
      started: new Date(2024, 9, 1),
    });

    await this.coursesService.create({
      name: 'Culinária Vegetariana',
      description:
        'Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.',
      cover: 'https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg',
      registrations: 0,
      started: new Date(2024, 9, 20),
    });

    await this.coursesService.create({
      name: 'Yoga para Iniciantes',
      description:
        'Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.',
      cover: 'https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg',
      registrations: 0,
      started: new Date(2024, 10, 15),
    });

    await this.coursesService.create({
      name: 'Produtividade Pessoal',
      description:
        'Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.',
      cover: 'https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg',
      registrations: 0,
      started: new Date(2024, 11, 5),
    });
  }
}
