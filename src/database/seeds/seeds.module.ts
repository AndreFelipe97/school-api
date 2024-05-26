import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { UserSeedService } from '../seeds-service/user-seed/user-seed.service';
import { CourseSeedService } from '../seeds-service/course-seed/course-seed.service';
import { CoursesModule } from 'src/modules/courses/courses.module';

@Module({
  imports: [UsersModule, CoursesModule],
  providers: [UserSeedService, CourseSeedService],
})
export class SeedsModule implements OnModuleInit {
  constructor(
    private readonly userSeedService: UserSeedService,
    private readonly courseSeedService: CourseSeedService,
  ) { }

  async onModuleInit() {
    await this.userSeedService.create();
    await this.courseSeedService.create();
  }
}
