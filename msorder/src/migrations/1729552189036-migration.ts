import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1729552189036 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "buy_cart",
                columns: [
                    {
                        name: "buyCartId",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "cartId",
                        type: "int",
                    },
                    {
                        name: "payment",
                        type: "enum",
                        enum: ["CREDIT", "DEBIT", "CASH"], // Exemplo de PaymentEnum
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["PENDING", "COMPLETED", "CANCELLED"], // Exemplo de StatusEnum
                    },
                ],
            })
        );

        // Criando a chave estrangeira para o relacionamento com Cart
        await queryRunner.createForeignKey(
            "buy_cart",
            new TableForeignKey({
                columnNames: ["cartId"],
                referencedTableName: "cart",
                referencedColumnNames: ["cartId"],
                onDelete: "CASCADE", // Apagar BuyCart caso o Cart seja deletado
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave estrangeira
        const table = await queryRunner.getTable("buy_cart");
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("cartId") !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey("buy_cart", foreignKey);
            }
        }

        // Remover a tabela
        await queryRunner.dropTable("buy_cart");
    }
}