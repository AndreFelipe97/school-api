import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTramitacoesDto } from 'src/dtos/Dto';
import { Tramitacao } from 'src/entities/tramitacoes.entity';
import { TramitacoesService } from 'src/services/tramitacoes/tramitacao.service';

interface ITramitacaoGetAll {
  totals: {
    totalPending: number;
    totalAuthorized: number;
    totalUnauthorized: number;
    total: number;
  };
  tramitacoes: Tramitacao[];
}

@ApiTags('tramitacoes')
@Controller('tramitacoes')
export class TramitacoesController {
  constructor(private readonly usersService: TramitacoesService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  async index(): Promise<ITramitacaoGetAll> {
    const tramitacoes = await this.usersService.findAll();

    return tramitacoes;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async detail(@Param('id') id: number): Promise<Tramitacao> {
    const user = await this.usersService.findById(id);

    return user;
  }

  @Post()
  async create(
    @Body() { envio, numero, situacao, tramitado }: CreateTramitacoesDto,
    @Res() response,
  ) {
    await this.usersService.create({
      envio,
      numero,
      situacao,
      tramitado,
    });

    return response.status(204).send();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() { envio, numero, situacao, tramitado }: CreateTramitacoesDto,
    @Res() response,
  ) {
    await this.usersService.update({
      envio,
      numero,
      situacao,
      tramitado,
    });

    return response.status(204).send();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response) {
    await this.usersService.delete(id);

    return response.status(204).send();
  }
}
