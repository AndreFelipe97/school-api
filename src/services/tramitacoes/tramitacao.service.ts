import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { userAlreadyExists, userNotFound } from 'src/messages/users/messages';
import { Tramitacao } from 'src/entities/tramitacoes.entity';

interface ITramitacaoGetAll {
  totals: {
    totalPending: number;
    totalAuthorized: number;
    totalUnauthorized: number;
    total: number;
  };
  tramitacoes: Tramitacao[];
}

@Injectable()
export class TramitacoesService {
  constructor(
    @InjectRepository(Tramitacao)
    private readonly tramitacaoRepository: Repository<Tramitacao>,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<ITramitacaoGetAll> {
    const totalPending = await this.tramitacaoRepository.count({
      where: { situacao: 'pending' },
    });

    const totalAuthorized = await this.tramitacaoRepository.count({
      where: { situacao: 'authorized' },
    });

    const totalUnauthorized = await this.tramitacaoRepository.count({
      where: { situacao: 'unauthorized' },
    });

    const total = await this.tramitacaoRepository.count();
    const tramitacoes = await this.tramitacaoRepository.find();
    return {
      totals: {
        totalPending,
        totalAuthorized,
        totalUnauthorized,
        total,
      },
      tramitacoes,
    };
  }

  async findById(id: number): Promise<Tramitacao> {
    const Tramitacao = await this.tramitacaoRepository.findOne({
      where: { id },
    });

    if (!Tramitacao) {
      throw new NotFoundException(userNotFound);
    }

    return { ...Tramitacao };
  }

  async findByNumber(numero: string): Promise<Tramitacao> {
    return await this.tramitacaoRepository.findOne({ where: { numero } });
  }

  async create({ envio, numero, situacao, tramitado }): Promise<boolean> {
    const userExists = await this.tramitacaoRepository.findOne({
      where: { numero },
    });

    if (userExists) {
      throw new BadRequestException(userAlreadyExists);
    }

    const Tramitacao = this.tramitacaoRepository.create({
      envio,
      numero,
      situacao,
      tramitado,
    });

    await this.tramitacaoRepository.save(Tramitacao);

    return true;
  }

  async update({ envio, numero, situacao, tramitado }): Promise<boolean> {
    const Tramitacao = await this.tramitacaoRepository.preload({
      envio,
      numero,
      situacao,
      tramitado,
    });

    if (!Tramitacao) {
      throw new NotFoundException(userNotFound);
    }

    await this.tramitacaoRepository.save(Tramitacao);

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const Tramitacao = await this.tramitacaoRepository.findOne({
      where: { id },
    });

    if (!Tramitacao) {
      throw new NotFoundException(userNotFound);
    }

    await this.tramitacaoRepository.delete(id);

    return true;
  }
}
