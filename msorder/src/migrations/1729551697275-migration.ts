import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1729551697275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cart',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'productId',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'personId',
                    type: 'int',
                    isNullable: false
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cart');
    }

}
