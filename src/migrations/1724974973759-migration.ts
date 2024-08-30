import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migration1724974973759 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'imgUrl',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'quantity',
                    type: 'int',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'category',
                    type: 'text',
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product');
    }

}