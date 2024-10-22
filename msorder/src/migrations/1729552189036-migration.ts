import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1729552189036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.createTable(new Table({
            name: 'history',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'cartId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'creationDate',
                    type: 'timestamp',
                    isNullable: false
                }
            ]
        }), true);

    
        await queryRunner.createForeignKey('history', new TableForeignKey({
            columnNames: ['cartId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cart',
            onDelete: 'SET NULL',  
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {    
        const table = await queryRunner.getTable('history');
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('cartId') !== -1);
        await queryRunner.dropForeignKey('history', foreignKey!);        
        await queryRunner.dropTable('history');
    }
    
}
