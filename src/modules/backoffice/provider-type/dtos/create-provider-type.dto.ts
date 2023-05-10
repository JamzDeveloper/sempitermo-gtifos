import { IsOptional, IsString } from 'class-validator';

export class CreateProviderTypeDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
