import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../entities/provider.entity';
import { Repository } from 'typeorm';
import { ProviderTypeService } from '../../provider-type/services/provider-type.service';
import { CreateProviderDto, UpdateProviderDto } from '../dtos';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    private readonly provideTypeService: ProviderTypeService,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    try {
      const { providerType, ...rest } = createProviderDto;
      const providerTypeFound = await this.provideTypeService.findOne(
        providerType,
      );
      const newProvider = await this.providerRepository.save({
        ...rest,
        providerType: providerTypeFound,
      });
      return newProvider;
    } catch (err) {
      this.handleDBErrors(err);
    }
  }
  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw error;
  }

  async findAll() {
    return await this.providerRepository.find();
  }
  async findOne(id: number) {
    const providerFound = await this.providerRepository.findOneBy({ id });
    if (!providerFound) {
      throw new BadRequestException(`Provider with id:${id} not found`);
    }
    return providerFound;
  }

  async update(id: number, updateProvider: UpdateProviderDto) {
    const providerFound = await this.findOne(id);
    const { providerType, ...rest } = updateProvider;
    if (providerType) {
      const providerTypeFound = await this.provideTypeService.findOne(
        providerType,
      );
      await this.providerRepository.update(id, {
        ...updateProvider,
        providerType: providerTypeFound,
      });
    } else {
      await this.providerRepository.update(id, { ...rest });
    }

    return {
      ...providerFound,
      ...updateProvider,
    };
  }
}
