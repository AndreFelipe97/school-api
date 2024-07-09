import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { UserSeedService } from '../seeds-service/user-seed/user-seed.service';
import { CourseSeedService } from '../seeds-service/course-seed/course-seed.service';
import { CoursesModule } from 'src/modules/courses/courses.module';
import { TramitacoesModule } from 'src/modules/tramitacoes/tramitacoes.module';
import { TramitacaoSeedService } from '../seeds-service/tramitacao-seed/tramitacao-seed.service';

@Module({
  imports: [UsersModule, CoursesModule, TramitacoesModule],
  providers: [UserSeedService, CourseSeedService, TramitacaoSeedService],
})
export class SeedsModule implements OnModuleInit {
  constructor(
    private readonly userSeedService: UserSeedService,
    private readonly courseSeedService: CourseSeedService,
    private readonly tramitacaoSeedService: TramitacaoSeedService,
  ) {}

  async onModuleInit() {
    await this.userSeedService.create();
    await this.courseSeedService.create();
    await this.tramitacaoSeedService.create();
  }
}
