import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Cars1727811908790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'Cars',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: 'model',
                        type: 'varchar',
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                    },
                    {
                        name: 'year',
                        type: 'integer',
                    },
                    {
                        name: 'valuePerDay',
                        type: 'integer',
                    },
                    {
                        name: 'acessories',
                        type: 'text',
                    },
                    {
                        name: 'numberOfPassengers',
                        type: 'integer',
                    },
                ],
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Cars');
    }

}
