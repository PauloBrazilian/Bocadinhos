import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1725676688895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "imgurl",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        length: "11",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "accesEnum",
                        type: "enum",
                        enum: ["ADMIN", "USER"], // Certifique-se de que `acessEnum` tem esses valores, ou ajuste conforme sua enumeração
                    },
                    {
                        name: "dataRegistro",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }
}
