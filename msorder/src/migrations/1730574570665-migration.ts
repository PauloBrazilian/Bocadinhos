import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1730574570665 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: "history",
            columns: [
                {
                    name: "historyId",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "creationDate",
                    type: "timestamp",
                },
                {
                    name: "status",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "buyCartId",
                    type: "int",
                    isUnique: true,
                }
            ],
        })
    );
    
    await queryRunner.createForeignKey("history", new TableForeignKey({
          columnNames: ["buyCartId"],
          referencedColumnNames: ["buyCartId"],
          referencedTableName: "buy_cart",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          })
        );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {      
      const table = await queryRunner.getTable("history");
      if (table) {
          const foreignKey = table.foreignKeys.find(
              (fk) => fk.columnNames.indexOf("buyCartId") !== -1
          );
          if (foreignKey) {
              await queryRunner.dropForeignKey("history", foreignKey);
          }
      }
      
      await queryRunner.dropTable("history");
      await queryRunner.dropTable("buy_cart");
    }

}
