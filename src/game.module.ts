import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Player } from './entities/player.entity';
import { InventoryItem } from './entities/inventory-item.entity';

@Module({
  imports: [
    // STEP 1: TypeOrmModule.forFeature([Item])
    TypeOrmModule.forFeature([Item]),
    // STEP 2: add Player to the list
    TypeOrmModule.forFeature([Player]),
    // STEP 4: add InventoryItem to the list
    TypeOrmModule.forFeature([InventoryItem])
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
