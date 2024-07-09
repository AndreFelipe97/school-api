import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './modules/courses/courses.module';
import { UsersCoursesModule } from './modules/users-courses/users-courses.module';
import { TramitacoesModule } from './modules/tramitacoes/tramitacoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    CoursesModule,
    UsersCoursesModule,
    TramitacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
