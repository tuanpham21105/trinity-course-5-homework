import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { DataSource } from 'typeorm';
import { PageQueryDto } from './common/dto/page-query.dto';
import { Max, Min } from 'class-validator';
import { CreatePlayerDto } from './common/dto/create-player.dto';
import { BuyItemDto } from './common/dto/buy-item.dto';

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
    return await this.game.items(query);
  }
  // STEP 2: @Post('players'), @Get('players/:id')
  @Post('players')
  @HttpCode(HttpStatus.CREATED)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) 
  {
    return await this.game.createPlayer(createPlayerDto.name);  
  }
  @Get('players/:id')
  async findPlayer(@Param('id', ParseIntPipe) id: number) {
    return await this.game.findPlayer(id);
  }
  // STEP 3: @Post('players/:id/attack')
  @Post('players/:id/attack')
  @HttpCode(HttpStatus.CREATED)
  async attack(@Param('id', ParseIntPipe) id: number) {
    return await this.game.attack(id);
  }
  // STEP 4: @Get('players/:id/inventory'), @Post('players/:id/buy')
  @Get('players/:id/inventory')
  async findInventoryItems(@Param('id', ParseIntPipe) id: number) {
    return await this.game.inventory(id);
  }
  @Post('players/:id/buy')
  async buy(@Param('id', ParseIntPipe) id: number, @Body() body: BuyItemDto) {
    return await this.game.buy(id, body.itemId);
  }
  // STEP 5: @Get('leaderboard')
  @Get('leaderboard')
  async leaderboard(@Query() query: PageQueryDto) {
    return await this.game.leaderboard(query.page, query.limit);
  }
}
