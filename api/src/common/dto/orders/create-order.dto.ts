import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDTO {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  credit_card_number: string;

  @IsString()
  @IsNotEmpty()
  credit_card_name: string;

  @IsNumber()
  @IsNotEmpty()
  credit_card_cvv: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  credit_card_expiration_month: number

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  credit_card_expiration_year: number;
}