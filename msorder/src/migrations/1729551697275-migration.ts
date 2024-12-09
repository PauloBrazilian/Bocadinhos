import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1729551697275 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart",
                columns: [
                    {
                        name: "cartId",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "productIds",
                        type: "int",
                        isArray: true,
                    },
                    {
                        name: "personId",
                        type: "int",
                    },
                    {
                        name: "quantity",
                        type: "decimal",
                    },
                    {
                        name: "total",
                        type: "decimal",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart");
    }
}
