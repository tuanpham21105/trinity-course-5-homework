// STEP 1: PageQueryDto for GET /items?page=1&limit=4
// page: number, default 1, minimum 1
// limit: number, default 10, minimum 1, maximum 20
// Query values arrive as strings, so convert them with @Type(() => Number).

import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class PageQueryDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(20)
    limit: number = 10;

}
