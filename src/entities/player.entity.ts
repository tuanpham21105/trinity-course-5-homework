// STEP 2: Player entity -> "player" table
// Columns: id, name (20), gold, xp, kills (default 0), monsterHp (nullable int)

import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryItem } from "./inventory-item.entity";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 20})
    name!: string;
    @Column({type: "int", default: 0})
    gold: number = 0;
    @Column({type: "int", default: 0})
    xp: number = 0;
    @Column({type: "int", default: 0})
    kills: number = 0;
    @Column({type: "int", nullable: true})
    monsterHp: number | null | undefined;
    @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.player)
    inventoryItems!: InventoryItem[];
}