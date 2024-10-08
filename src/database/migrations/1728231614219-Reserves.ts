import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Reserves1728231614219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'Reserves',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: 'startDate',
                        type: 'date',
                    },
                    {
                        name: 'finalValue', 
                        type: 'decimal', 
                        
                    },
                    {
                        name: 'endDate',
                        type: 'date',
                    },
                    {
                        name: 'carId',
                        type: 'decimal',
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'Car_Reserve',
                        referencedTableName: 'Cars',
                        referencedColumnNames: ['id'],
                        columnNames: ['carId'],
                        onDelete: 'CASCADE'
                    },
                    {
                        name: 'User_Reserve',
                        referencedTableName: 'Users',
                        referencedColumnNames: ['id'],
                        columnNames: ['userId'],
                        onDelete: 'CASCADE'
                    },
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Reserves');
    }

}
