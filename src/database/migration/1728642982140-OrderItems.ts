import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class OrderItems1728642982140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"orderitems",
            columns:[{
                name:"order_item_id",
                type:"integer",
                isPrimary:true,
                isGenerated:true,
                generationStrategy:"increment"
            },
            {
                name:"order_id",
                type:"int",
            },
            {
                name:"product_id",
                type:"int",
            },
            {
                name:"quantity",
                type:"int",
            },
            {
                name:"price",
                type:"decimal",
            },
            ],
        }));
        await queryRunner.createForeignKey(
            'orderitems',
            new TableForeignKey({
                columnNames:['order_id'],
                referencedColumnNames:['order_id'],
                referencedTableName:'orders'
            })
        )
        await queryRunner.createForeignKey(
            'orderitems',
            new TableForeignKey({
                columnNames:['product_id'],
                referencedColumnNames:['product_id'],
                referencedTableName:'products'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orderitems')
    }

}
