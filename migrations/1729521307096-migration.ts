import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729521307096 implements MigrationInterface {
    name = 'Migration1729521307096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brand" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brand" character varying`);
    }

}
