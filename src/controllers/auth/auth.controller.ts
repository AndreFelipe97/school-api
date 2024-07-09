import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthResponseDto, SignInDto } from 'src/dtos/Dto';
import { AuthService } from 'src/services/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  singIn(@Body() { email, password }: SignInDto): Promise<AuthResponseDto> {
    console.log('Entrou no controller!');
    return this.authService.singIn(email, password);
  }
}
