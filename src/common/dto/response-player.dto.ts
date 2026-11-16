export class ResponsePlayerDto 
{ 
    id!: number; 
    name!: string; 
    level!: number; 
    xp!: number; 
    gold!: number;
    attack!: number; 
    kills!: number;
    monster!: Monster;
}

export interface Monster 
{ 
    name: string, 
    icon: string, 
    hp: number, 
    maxHp: number
} 