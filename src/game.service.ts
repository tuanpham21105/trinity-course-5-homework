import { Injectable } from '@nestjs/common';
import { PageQueryDto } from './common/dto/page-query.dto';
import { DataSource, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameService {
  constructor (@InjectRepository(Item) private readonly itemsRepository: Repository<Item>) {}
  // STEP 1: items({ page, limit })
  async items(pageQueryDto: PageQueryDto) {
    const [data, total] = await this.itemsRepository.findAndCount({                                                                                                                            
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
  // STEP 3: attack(id)
  // STEP 4: inventory(id), buy(playerId, itemId), attackOf(playerId)
  // STEP 5: leaderboard({ page, limit }) without the N+1 problem
}
