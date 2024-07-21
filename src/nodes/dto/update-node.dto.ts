import { IsString, IsOptional } from 'class-validator';

export class UpdateNodeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  leftChildId?: string;

  @IsOptional()
  @IsString()
  rightChildId?: string;
}
