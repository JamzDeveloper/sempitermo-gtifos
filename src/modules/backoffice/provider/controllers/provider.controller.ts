import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { CreateProviderDto, UpdateProviderDto } from '../dtos';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post('create')
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':providerId')
  findnOne(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.providerService.findOne(providerId);
  }

  @Patch(':providerId')
  update(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.update(providerId, updateProviderDto);
  }
}
