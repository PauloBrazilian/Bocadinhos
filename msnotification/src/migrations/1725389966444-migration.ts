import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1725389966444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'email',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'fromEmail',
                type: 'varchar',
              },
              {
                name: 'fromName',
                type: 'varchar',
              },
              {
                name: 'replyTo',
                type: 'varchar',
              },
              {
                name: 'subject',
                type: 'varchar',
              },
              {
                name: 'body',
                type: 'text',
              },
              {
                name: 'statusEmail',
                type: 'varchar',
              },
              {
                name: 'img',
                type: 'varchar',
                isNullable: true,
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('email');
      }

}
