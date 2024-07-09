import { Test, TestingModule } from '@nestjs/testing';
import { CourseSeedService } from './course-seed.service';

describe('CourseSeedService', () => {
  let service: CourseSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseSeedService],
    }).compile();

    service = module.get<CourseSeedService>(CourseSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
