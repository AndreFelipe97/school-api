import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tramitacoes')
export class Tramitacao {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  envio: Date;
  @Column()
  numero: string;
  @Column()
  situacao: string;
  @Column()
  tramitado: Date;
}
