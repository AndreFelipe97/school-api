import { Injectable } from '@nestjs/common';
import { TramitacoesService } from 'src/services/tramitacoes/tramitacao.service';

@Injectable()
export class TramitacaoSeedService {
  constructor(private readonly tramitacoesService: TramitacoesService) {}

  async create() {
    const tramitacao1 = await this.tramitacoesService.findByNumber('001');
    const tramitacao2 = await this.tramitacoesService.findByNumber('002');
    const tramitacao3 = await this.tramitacoesService.findByNumber('003');
    const tramitacao4 = await this.tramitacoesService.findByNumber('004');
    const tramitacao5 = await this.tramitacoesService.findByNumber('005');
    const tramitacao6 = await this.tramitacoesService.findByNumber('006');
    const tramitacao7 = await this.tramitacoesService.findByNumber('007');
    const tramitacao8 = await this.tramitacoesService.findByNumber('008');
    const tramitacao9 = await this.tramitacoesService.findByNumber('009');
    const tramitacao10 = await this.tramitacoesService.findByNumber('010');

    if (
      tramitacao1 ||
      tramitacao2 ||
      tramitacao3 ||
      tramitacao4 ||
      tramitacao5 ||
      tramitacao6 ||
      tramitacao7 ||
      tramitacao8 ||
      tramitacao9 ||
      tramitacao10
    ) {
      return;
    }

    await this.tramitacoesService.create({
      envio: new Date(2024, 0, 1),
      numero: '001',
      situacao: 'pending',
      tramitado: new Date(2024, 0, 2),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 1, 5),
      numero: '002',
      situacao: 'unauthorized',
      tramitado: new Date(2024, 1, 6),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 2, 10),
      numero: '003',
      situacao: 'authorized',
      tramitado: new Date(2024, 2, 11),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 3, 15),
      numero: '004',
      situacao: 'pending',
      tramitado: new Date(2024, 3, 16),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 4, 20),
      numero: '005',
      situacao: 'unauthorized',
      tramitado: new Date(2024, 4, 21),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 5, 25),
      numero: '006',
      situacao: 'authorized',
      tramitado: new Date(2024, 5, 26),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 6, 30),
      numero: '007',
      situacao: 'pending',
      tramitado: new Date(2024, 7, 1),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 7, 5),
      numero: '008',
      situacao: 'unauthorized',
      tramitado: new Date(2024, 7, 6),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 8, 10),
      numero: '009',
      situacao: 'authorized',
      tramitado: new Date(2024, 8, 11),
    });

    await this.tramitacoesService.create({
      envio: new Date(2024, 9, 15),
      numero: '010',
      situacao: 'pending',
      tramitado: new Date(2024, 9, 16),
    });
  }
}
