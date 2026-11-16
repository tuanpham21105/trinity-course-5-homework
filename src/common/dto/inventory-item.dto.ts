import { Item } from "src/entities/item.entity";

export class InventoryItemDto {
    constructor (item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
    item!: Item;
    quantity: number = 1;
}