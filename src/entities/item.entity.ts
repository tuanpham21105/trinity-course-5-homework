// STEP 1: Item entity -> "item" table
// Columns: id, name, icon, attack (int), price (int)

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("items")
export class Item {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    icon!: string;
    @Column({type: "int"})
    attack!: number;
    @Column({type: "int"})
    price!: number;
    }
