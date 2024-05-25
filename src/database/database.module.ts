import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { SeedsModule } from './seeds/seeds.module';
import { UserSeedService } from './seeds-service/user-seed/user-seed.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('DATABASE_TYPE') as any,
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE') as string,
          entities: [User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    SeedsModule,
  ],
  providers: [UserSeedService],
})
export class DatabaseModule { }
