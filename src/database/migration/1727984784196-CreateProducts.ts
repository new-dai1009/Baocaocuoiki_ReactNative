import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProducts1727984784196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"products",
            columns:[{
                name:"product_id",
                type:"integer",
                isPrimary:true,
                isGenerated:true,
                generationStrategy:"increment"
            },
            {
                name:"name",
                type:"varchar",
            },
            {
                name:"description",
                type:"text",
            },
            {
               name:"category_id" ,
               type:"int"
            },
            {
                name:"price",
                type:"decimal",
            },
            {
                name:"stock_quantity",
                type:"integer",
            },
            {
                name:"created_at",
                type:"timestamp",
                default:'now()'
            },
            {
                name:"updated_at",
                type:"timestamp",
                default:'now()'
            },
            ],
        }))
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames:['category_id'],
                referencedColumnNames:['category_id'],
                referencedTableName:'categories'
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
