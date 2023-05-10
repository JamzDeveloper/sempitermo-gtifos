import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderTypeDto } from './create-provider-type.dto';
export class UpdateProviderTypeDto extends PartialType(CreateProviderTypeDto) {}
