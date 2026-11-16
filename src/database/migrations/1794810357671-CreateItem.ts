import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItem1794810357671 implements MigrationInterface {
    name = 'CreateItem1794810357671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying NOT NULL, "attack" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query
        (`
            INSERT INTO items (id, name, icon, attack, price) VALUES
            (1, 'Wooden Dagger', '🗡️',  1,  15),
            (2, 'Iron Sword',    '⚔️',  3,  40),
            (3, 'Hunter Bow',    '🏹',  4,  60),
            (4, 'Battle Axe',    '🪓',  5,  75),
            (5, 'War Hammer',    '🔨',  8,  130),
            (6, 'Magic Wand',    '🪄',  12, 200),
            (7, 'Sea Trident',   '🔱',  18, 320),
            (8, 'Dragon Blade',  '🔥',  30, 600);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
