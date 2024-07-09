import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { passwordDoesNotMatch, userNotFound } from 'src/messages/auth/messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    console.log('Entrou no service!');
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(userNotFound);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(passwordDoesNotMatch);
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    const expiresIn = +this.configService.get('JWT_EXPIRES_IN') * 24;

    return {
      token,
      expiresIn,
    };
  }
}
