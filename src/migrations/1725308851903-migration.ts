import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1725308851903 implements MigrationInterface {

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
                    isNullable: true,
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
                    name: 'categoryId',
                    type: 'int',
                    isNullable: true,
                },
            ]
        }), true);

        await queryRunner.createForeignKey('product', new TableForeignKey({
            columnNames: ['categoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('product', 'FK_product_category');
        await queryRunner.dropTable('product');
    }

}
