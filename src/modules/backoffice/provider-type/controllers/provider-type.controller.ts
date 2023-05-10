import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProviderTypeService } from '../services/provider-type.service';
import { CreateProviderTypeDto } from '../dtos/create-provider-type.dto';
import { UpdateProviderTypeDto } from '../dtos/update-provider-type.dto';

@Controller('provider-types')
export class ProviderTypeController {
  constructor(private readonly providerTypeService: ProviderTypeService) {}

  @Post('create')
  create(@Body() createProviderTypeDto: CreateProviderTypeDto) {
    return this.providerTypeService.create(createProviderTypeDto);
  }

  @Get()
  findAll() {
    return this.providerTypeService.findAll();
  }

  @Get(':providerTypeId')
  findnOne(@Param('providerTypeId', ParseIntPipe) providerTypeId: number) {
    return this.providerTypeService.findOne(providerTypeId);
  }

  @Patch(':providerTypeId')
  update(
    @Param('providerTypeId', ParseIntPipe) providerTypeId: number,
    @Body() updateProviderTypeDto: UpdateProviderTypeDto,
  ) {
    return this.providerTypeService.update(
      providerTypeId,
      updateProviderTypeDto,
    );
  }
}
