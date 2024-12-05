import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCartItems1727984815215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"cart_items",
            columns:[{
                name:"cart_items_id",
                type:"integer",
                isPrimary:true,
                isGenerated:true,
                generationStrategy:"increment"
            },
            {
                name:"cart_id",
                type:"int",
            },
            {
                name:"product_id",
                type:"int",
            },
            {
                name:"quantity",
                type:"int",
            }
            ],
        }));
        await queryRunner.createForeignKey(
            'cart_items',
            new TableForeignKey({
                columnNames:['cart_id'],
                referencedColumnNames:['cart_id'],
                referencedTableName:'cart'
            })
        )
        await queryRunner.createForeignKey(
            'cart_items',
            new TableForeignKey({
                columnNames:['product_id'],
                referencedColumnNames:['product_id'],
                referencedTableName:'products'
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cart_items')
    }

}
