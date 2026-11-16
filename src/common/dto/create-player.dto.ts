import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name!: string;
}