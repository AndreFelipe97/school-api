import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { SeedsModule } from './seeds/seeds.module';
import { UserSeedService } from './seeds-service/user-seed/user-seed.service';
import { UsersModule } from 'src/modules/users/users.module';
import { Courses } from 'src/entities/courses.entity';
import { CourseSeedService } from './seeds-service/course-seed/course-seed.service';
import { CoursesModule } from 'src/modules/courses/courses.module';
import { UserCourse } from 'src/entities/usersCourses.entity';
import { TramitacoesModule } from 'src/modules/tramitacoes/tramitacoes.module';
import { Tramitacao } from 'src/entities/tramitacoes.entity';

@Module({
  imports: [
    UsersModule,
    TramitacoesModule,
    CoursesModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const isSslEnabled = configService.get('DATABASE_SSL') === 'true';
        return {
          type: configService.get('DATABASE_TYPE') as any,
          url: configService.get('DATABASE_URL'),
          entities: [User, Courses, UserCourse, Tramitacao],
          synchronize: true,
          ssl: isSslEnabled
            ? {
                rejectUnauthorized: true,
              }
            : false,
        };
      },
      inject: [ConfigService],
    }),
    SeedsModule,
  ],
  providers: [UserSeedService, CourseSeedService],
})
export class DatabaseModule {}
