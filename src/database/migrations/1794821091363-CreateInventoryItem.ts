import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryItem1794821091363 implements MigrationInterface {
    name = 'CreateInventoryItem1794821091363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory_items" ("id" SERIAL NOT NULL, "playerId" integer NOT NULL, "itemId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_0302e729d94752b393cc7ae1ded" UNIQUE ("playerId", "itemId"), CONSTRAINT "PK_cf2f451407242e132547ac19169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "gold" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "xp" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "inventory_items" ADD CONSTRAINT "FK_505a1d2410060c8358e1b37c131" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_items" DROP CONSTRAINT "FK_505a1d2410060c8358e1b37c131"`);
        await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "xp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "players" ALTER COLUMN "gold" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "inventory_items"`);
    }

}
