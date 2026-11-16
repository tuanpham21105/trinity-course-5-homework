import { Controller } from '@nestjs/common';
import { GameService } from './game.service';

@Controller()
export class GameController {
  constructor(private readonly game: GameService) {}

  // STEP 0: @Get('health')
  // STEP 1: @Get('items')
  // STEP 2: @Post('players'), @Get('players/:id')
  // STEP 3: @Post('players/:id/attack')
  // STEP 4: @Get('players/:id/inventory'), @Post('players/:id/buy')
  // STEP 5: @Get('leaderboard')
}
