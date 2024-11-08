import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1730574570665 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar a tabela History
        await queryRunner.createTable(
            new Table({
                name: "history",
                columns: [
                    {
                        name: "historyId",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment", // Auto incrementado
                    },
                    {
                        name: "buyCartId",
                        type: "int",
                        isNullable: true, // Coluna opcional para a relação
                    },
                    {
                        name: "creationDate",
                        type: "timestamp", // Usando timestamp para data de criação
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: true, // Status é opcional
                    },
                ],
            })
        );

        // Criar a chave estrangeira entre history e buy_cart
        await queryRunner.createForeignKey(
            "history",
            new TableForeignKey({
                columnNames: ["buyCartId"],
                referencedTableName: "buy_cart",
                referencedColumnNames: ["buyCartId"],
                onDelete: "SET NULL", // Se BuyCart for deletado, o campo buyCartId será setado como NULL
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave estrangeira
        const table = await queryRunner.getTable("history");
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("buyCartId") !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey("history", foreignKey);
            }
        }

        // Remover a tabela
        await queryRunner.dropTable("history");
    }
}
