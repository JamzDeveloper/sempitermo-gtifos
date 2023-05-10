import { Schemas } from 'src/config/schemas.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProviderType } from '../../provider-type/entities/provider-type.entity';
@Entity({ schema: Schemas.backOffice, name: 'provider' })
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: true, unique: true, type: 'varchar' })
  ruc: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @Column({ array: true, type: 'varchar' })
  phones: string[];

  @Column({ nullable: true, type: 'varchar' })
  fax: string;

  @Column({ type: 'varchar', array: true })
  emails: string[];

  @Column({ nullable: true, type: 'varchar' })
  contact: string;

  @Column({ default: true, nullable: false, type: 'boolean' })
  isActive: string;

  @ManyToOne(() => ProviderType, (providerType) => providerType.providers)
  @JoinColumn({ name: 'provider_type_id' })
  providerType: ProviderType;
}
