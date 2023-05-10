import { Schemas } from 'src/config/schemas.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';

@Entity({ schema: Schemas.backOffice, name: 'provider_type' })
export class ProviderType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ default: true, nullable: false, type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => Provider, (provider) => provider.providerType)
  providers: Provider[];
}
