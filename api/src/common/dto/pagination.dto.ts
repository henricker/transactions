import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";


export class PaginationDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}