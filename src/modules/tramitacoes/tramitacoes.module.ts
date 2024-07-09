import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramitacoesController } from 'src/controllers/tramitacoes/tramitacoes.controller';
import { Tramitacao } from 'src/entities/tramitacoes.entity';
import { TramitacoesService } from 'src/services/tramitacoes/tramitacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tramitacao])],
  controllers: [TramitacoesController],
  exports: [TramitacoesService],
  providers: [TramitacoesService],
})
export class TramitacoesModule {}
