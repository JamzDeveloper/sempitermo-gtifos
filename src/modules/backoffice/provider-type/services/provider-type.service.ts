import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProviderType } from '../entities/provider-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProviderTypeDto } from '../dtos/create-provider-type.dto';
import { UpdateProviderTypeDto } from '../dtos/update-provider-type.dto';

@Injectable()
export class ProviderTypeService {
  constructor(
    @InjectRepository(ProviderType)
    private providerTypeRepository: Repository<ProviderType>,
  ) {}

  async findOne(id: number) {
    const providerTypeFound = await this.providerTypeRepository.findOne({
      where: { id },
    });
    if (!providerTypeFound) {
      throw new BadRequestException(`Provider type with id:${id} not found`);
    }
    return providerTypeFound;
  }

  async findAll() {
    return await this.providerTypeRepository.find();
  }

  async create(createProviderTypeDto: CreateProviderTypeDto) {
    try {
      const newProviderType = await this.providerTypeRepository.save(
        createProviderTypeDto,
      );

      return newProviderType;
    } catch (err) {
      this.handleDBErrors(err);
    }
  }

  async update(id: number, updateProviderTypeDto: UpdateProviderTypeDto) {
    const providerTypeFound = await this.findOne(id);
    if (!updateProviderTypeDto.description && !updateProviderTypeDto.name) {
      throw new BadRequestException('fild is required');
    }
    await this.providerTypeRepository.update(id, {
      ...updateProviderTypeDto,
    });

    return {
      ...providerTypeFound,
      ...updateProviderTypeDto,
    };
  }
  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Please check server log');
  }
}
