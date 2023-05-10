import { Module } from '@nestjs/common';
import { ProviderTypeService } from './services/provider-type.service';
import { ProviderTypeController } from './controllers/provider-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderType } from './entities/provider-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderType])],
  controllers: [ProviderTypeController],
  providers: [ProviderTypeService],
  exports: [ProviderTypeService],
})
export class ProviderTypeModule {}
