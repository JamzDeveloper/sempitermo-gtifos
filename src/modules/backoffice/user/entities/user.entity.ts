import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Schemas } from '../../../../config/schemas.enum';

@Entity({ schema: Schemas.backOffice, name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, name: 'name' }) //drusuario
  name: string;

  @Column({ type: 'varchar', nullable: true, name: 'last_name' }) //drusuario
  lastName: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar', {
    select: false,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  telefono: string;

  @Column('varchar', {
    nullable: true,
  })
  direccion: string;

  @Column('varchar', {
    nullable: true,
  })
  ciudad: string;

  @Column('bool', {
    default: true,
  })
  state: boolean;

  @Column('integer', {
    array: true,
    default: [1],
  })
  rol: string[];

  @Column({ type: 'integer', nullable: true })
  turno: number;

  @Column({ type: 'varchar', nullable: true })
  dni: string;

  @Column({ type: 'varchar', nullable: true })
  ruc: string;
}
