import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  ruc: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsArray()
  phones: string[];

  @IsString()
  @IsOptional()
  fax: string;

  @IsArray()
  emails: string[];

  @IsString()
  @IsOptional()
  contact: string;

  @IsInt()
  providerType: number;
}
