import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728636972378 implements MigrationInterface {
    name = 'Migration1728636972378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "subCategoryEntityId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subCategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_58ac195f4b1005721f6e844daee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_79cabf2fe11bda2fe6f84a3c2bf" FOREIGN KEY ("subCategoryEntityId") REFERENCES "subCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_79cabf2fe11bda2fe6f84a3c2bf"`);
        await queryRunner.query(`DROP TABLE "subCategory"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
