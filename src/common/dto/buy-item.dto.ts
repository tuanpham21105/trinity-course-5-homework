import { IsNotEmpty, IsNumber } from "class-validator";

export class BuyItemDto {
    @IsNotEmpty()
    @IsNumber()
    itemId!: number;
}