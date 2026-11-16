import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayer1794813361288 implements MigrationInterface {
    name = 'CreatePlayer1794813361288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "gold" integer NOT NULL, "xp" integer NOT NULL, "kills" integer NOT NULL DEFAULT '0', "monsterHp" integer, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
