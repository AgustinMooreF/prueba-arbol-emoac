import { IsString, IsOptional } from 'class-validator';

export class CreateNodeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
