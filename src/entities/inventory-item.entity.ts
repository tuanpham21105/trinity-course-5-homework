// STEP 4: InventoryItem entity -> link table Player <-> Item
// Columns: id, playerId, itemId, quantity (default 1)
// Add a ManyToOne relation to Item and a unique constraint on playerId + itemId.

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Item } from "./item.entity";

@Entity('inventory_items')
@Unique(['playerId', 'itemId'])
export class InventoryItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    playerId!: number;

    @Column()
    itemId!: number;

    @Column({default: 1, type: "int"})
    quantity!: number; 

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'itemId' })
    item!: Item;
}
