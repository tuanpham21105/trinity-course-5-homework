import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  // STEP 1: items({ page, limit })
  // STEP 2: createPlayer(name), findPlayer(id), toPlayerView(player, attack = 1)
  // STEP 3: attack(id)
  // STEP 4: inventory(id), buy(playerId, itemId), attackOf(playerId)
  // STEP 5: leaderboard({ page, limit }) without the N+1 problem
}
