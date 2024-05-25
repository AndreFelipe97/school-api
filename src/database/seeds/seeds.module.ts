import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { UserSeedService } from '../seeds-service/user-seed/user-seed.service';

@Module({
  imports: [UsersModule],
  providers: [UserSeedService],
})
export class SeedsModule implements OnModuleInit {
  constructor(private readonly userSeedService: UserSeedService) {}

  async onModuleInit() {
    await this.userSeedService.create();
  }
}
