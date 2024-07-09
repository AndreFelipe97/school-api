import { PartialType } from '@nestjs/swagger';
import { CreateTramitacoesDto } from './createTramitacoes.dto';

export class UpdateTramitacoesDto extends PartialType(CreateTramitacoesDto) {}
