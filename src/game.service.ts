import { BadRequestException, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PageQueryDto } from './common/dto/page-query.dto';
import { DataSource, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { InventoryItem } from './entities/inventory-item.entity';
import { InventoryItemDto } from './common/dto/inventory-item.dto';

@Injectable()
export class GameService {
  constructor (@InjectRepository(Item) private readonly itemsRepo: Repository<Item>, @InjectRepository(Player) private readonly playersRepo: Repository<Player>, @InjectRepository(InventoryItem) private readonly inventoryItemsRepo: Repository<InventoryItem>) {}

  private readonly monsters = 
  [
    {name: "Slime", icon: "🟢"},
    {name: "Goblin", icon: "👺"},
    {name: "Skeleton", icon: "💀"},
    {name: "Orc", icon: "👹"},
    {name: "Dragon", icon: "🐉"},
  ];
  private monsterMaxHp(kills: number) {
    return 8 + kills * 4;
  }
  private mapMonster(kills: number, hp: number | undefined) {
    const monsterId = kills % 5;
    const maxHp = this.monsterMaxHp(kills);
    return {
      name: this.monsters[monsterId].name,
      icon: this.monsters[monsterId].icon,
      hp: hp ?? maxHp,
      maxHp: maxHp
    };
  }
  private async convertToResponsePlayer(player: Player) {
    return {
      id: player.id,
      name: player.name, 
      level: 1 + Math.floor(player.xp / 100), 
      xp: player.xp, 
      gold: player.gold,
      attack: await this.attackOf(player.id), 
      kills: player.kills,
      monster: this.mapMonster(player.kills, player.monsterHp)
    };
  }
  private async findOnePlayerById(id: number) {
    const player = await this.playersRepo.findOneBy({id: id});
    if (!player)
      throw new NotFoundException();
    return player;
  }
  private async findOneItemById(id: number) {
    const item = await this.itemsRepo.findOneBy({id: id});
    if (!item)
      throw new NotFoundException();
    return item;
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
    return await this.convertToResponsePlayer(await this.playersRepo.save(created));
  }
  async findPlayer(id: number) {
    const player = await this.findOnePlayerById(id);
    return await this.convertToResponsePlayer(player);
  }
  // STEP 3: attack(id)
  async attack(id: number) {
    const player = await this.findOnePlayerById(id);
    const damage = await this.attackOf(id);
    player.monsterHp = Math.max((player.monsterHp ?? this.monsterMaxHp(player.kills)) - damage, 0);
    let isDefeated = false;
    const rewardGold = 5 + player.kills * 2;
    if (player.monsterHp === 0) {
      isDefeated = true;
      player.gold += rewardGold;
      player.xp += 25;
      player.kills++;
      player.monsterHp = undefined;
    }
    const updatedPlayer = await this.playersRepo.save(player);
    return {
      damage: damage,
      defeated: isDefeated,
      reward: !isDefeated ? null : {gold: rewardGold, xp: 25},
      player: await this.convertToResponsePlayer(updatedPlayer)
    };
  }
  // STEP 4: inventory(id), buy(playerId, itemId), attackOf(playerId)
  async inventory(id: number) {
    const player = await this.findOnePlayerById(id);
    return (await this.inventoryItemsRepo.find({where: {playerId: id}, relations: {item: true}})).map((value) => new InventoryItemDto(value.item, value.quantity));
  }
  async buy(playerId: number, itemId: number) {
    const player = await this.findOnePlayerById(playerId);
    const item = await this.findOneItemById(itemId);
    if (player.gold < item.price) 
      throw new BadRequestException();
    const inventoryItem = await this.inventoryItemsRepo.findOneBy({playerId, itemId});
    const newInventoryItem = this.inventoryItemsRepo.create({ id: inventoryItem?.id, playerId, itemId, quantity: inventoryItem ? inventoryItem.quantity + 1 : 1 });
    await this.inventoryItemsRepo.save(newInventoryItem);
    player.gold -= item.price;
    await this.playersRepo.save(player);
    return {item, player: await this.convertToResponsePlayer(player)};
  }
  async attackOf(playerId: number): Promise<number>
  {
    const damage = 1 + (await this.inventory(playerId)).reduce((p, c) => (p + c.item.attack * c.quantity), 0);
    return damage;
  }
  // STEP 5: leaderboard({ page, limit }) without the N+1 problem
}
