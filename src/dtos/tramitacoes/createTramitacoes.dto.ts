import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateTramitacoesDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly envio: Date;

  @IsString()
  readonly numero: string;

  @IsString()
  readonly situacao: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly tramitado: Date;
}
