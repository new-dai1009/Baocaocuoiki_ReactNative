import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePayments1728642882074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"payments",
            columns:[{
                name:"payment_id",
                type:"integer",
                isPrimary:true,
                isGenerated:true,
                generationStrategy:"increment"
            },
            {
                name:"user_id",
                type:"int",
            },
            {
                name: "order_id",
                type: "int",  
            },
            {
                name:"payment_date",
                type:"timestamp",
                default:'now()'
            },
            {
                name:"amount",
                type:"decimal",
            },
            {
                name:"payment_method",
                type:"varchar",
            },
            {
                name:"payment_status",
                type:"varchar",
            },
            ],
        }));
        await queryRunner.createForeignKey(
            'payments',
            new TableForeignKey({
                columnNames:['order_id'],
                referencedColumnNames:['order_id'],
                referencedTableName:'orders'
            })
        )
        await queryRunner.createForeignKey(
            'payments',
            new TableForeignKey({
                columnNames:['user_id'],
                referencedColumnNames:['user_id'],
                referencedTableName:'users'
                })
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payments')

    }

}
