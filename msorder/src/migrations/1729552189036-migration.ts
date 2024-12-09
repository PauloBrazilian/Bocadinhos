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
                name: "payment",
                type: "enum",
                enum: ["CREDIT_CARD", "DEBIT_CARD", "PIX", "CASH"],
              },
              {
                name: "status",
                type: "enum",
                enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "FINALIZED", "CANCELLED"],
              },
              {
                name: "cartId",
                type: "int",
              },
            ],
          })
        );
    
        await queryRunner.createForeignKey(
          "buy_cart",
          new TableForeignKey({
            columnNames: ["cartId"],
            referencedTableName: "cart",
            referencedColumnNames: ["cartId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          })
          );
        }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buy_cart");
      }
}