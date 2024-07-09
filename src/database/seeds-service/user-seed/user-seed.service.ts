import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class UserSeedService {
  constructor(private readonly usersService: UsersService) {}

  async create() {
    const userExist = await this.usersService.findByEmail('admin@gmail.com');
    if (userExist) {
      return;
    }

    await this.usersService.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
      birthdate: new Date('1997-10-17'),
    });
  }
}
