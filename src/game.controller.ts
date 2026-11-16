import { Controller, Get, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { DataSource } from 'typeorm';
import { PageQueryDto } from './common/dto/page-query.dto';

@Controller()
export class GameController {
  constructor(private readonly game: GameService, private readonly dataSource: DataSource) {}

  // STEP 0: @Get('health')
  @Get('health')
  async health() {
    await this.dataSource.query('SELECT 1');
    return {db: "up"};
  }
  // STEP 1: @Get('items')
  @Get('items')
  async findAll(@Query() query: PageQueryDto) {
    return this.game.items(query);
  }
  // STEP 2: @Post('players'), @Get('players/:id')
  // STEP 3: @Post('players/:id/attack')
  // STEP 4: @Get('players/:id/inventory'), @Post('players/:id/buy')
  // STEP 5: @Get('leaderboard')
}
