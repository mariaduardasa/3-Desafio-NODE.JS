import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1728002886709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'Users',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'birth',
                        type: 'date',
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                ],
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Users');
    }

}
