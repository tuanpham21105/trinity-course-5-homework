export class LeaderboardItem {
    rank!: number;
    id!: number;
    name!: string;
    level!: number;
    xp!: number;
    gold!: number;
    attack!: number;

    constructor(
        rank: number,
        id: number,
        name: string,
        level: number,
        xp: number,
        gold: number,
        attack: number,
    ) {
        this.rank = rank;
        this.id = id;
        this.name = name;
        this.level = level;
        this.xp = xp;
        this.gold = gold;
        this.attack = attack;
    }
}