import { Module } from '@nestjs/common';
import { ProviderService } from './services/provider.service';
import { ProviderController } from './controllers/provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { ProviderTypeModule } from '../provider-type/provider-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Provider]), ProviderTypeModule],

  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
