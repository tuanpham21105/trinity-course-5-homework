import { BadRequestException, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PageQueryDto } from './common/dto/page-query.dto';
import { DataSource, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { ResponsePlayerDto } from './common/dto/response-player.dto';
import { max } from 'class-validator';

@Injectable()
export class GameService {
  constructor (@InjectRepository(Item) private readonly itemsRepo: Repository<Item>, @InjectRepository(Player) private readonly playersRepo: Repository<Player>) {}

  private readonly monsters = 
  [
    {name: "Slime", icon: "🟢"},
    {name: "Goblin", icon: "👺"},
    {name: "Skeleton", icon: "💀"},
    {name: "Orc", icon: "👹"},
    {name: "Dragon", icon: "🐉"},
  ];

  private mapMonster(kills: number, hp: number | undefined) {
    const monsterId = kills % 5;
    const maxHp = 8 + kills * 4;
    return {
      name: this.monsters[monsterId].name,
      icon: this.monsters[monsterId].icon,
      hp: hp ?? maxHp,
      maxHp: maxHp
    };
  }
  private convertToResponsePlayer(player: Player) {
    return {
      id: player.id,
      name: player.name, 
      level: 1 + Math.floor(player.xp / 100), 
      xp: player.xp, 
      gold: player.gold,
      attack: 1, 
      kills: player.kills,
      monster: this.mapMonster(player.kills, player.monsterHp)
    };
  }

  // STEP 1: items({ page, limit })
  async items(pageQueryDto: PageQueryDto) {
    const [data, total] = await this.itemsRepo.findAndCount({                                                                                                                            
      order: { id: 'ASC' },                                                                                                                                                             
      skip: (pageQueryDto.page - 1) * pageQueryDto.limit,                                                                                                                                                         
      take: pageQueryDto.limit,                                                                                                                                                                      
    });                                                                                                                                                                                 
                                                                                                                                                                                        
    return {                                                                                                                                                                            
      data,
      page: pageQueryDto.page,
      limit: pageQueryDto.limit,
      total,
    };
  }
  // STEP 2: createPlayer(name), findPlayer(id), toPlayerView(player, attack = 1)
  async createPlayer(name: string) {
    const created = this.playersRepo.create(
      {
        name: name
      }
    );
    console.log(created);
    return this.convertToResponsePlayer(await this.playersRepo.save(created));
  }
  async findPlayer(id: number) {
    const player = await this.playersRepo.findOneBy({id: id});
    if (!player)
      throw new NotFoundException();
    return this.convertToResponsePlayer(player);
  }
  // STEP 3: attack(id)
  // STEP 4: inventory(id), buy(playerId, itemId), attackOf(playerId)
  // STEP 5: leaderboard({ page, limit }) without the N+1 problem
}
