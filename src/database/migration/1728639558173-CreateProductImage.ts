import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductImage1728639558173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"product_image",
            columns:[{
                name:"image_id",
                type:"integer",
                isPrimary:true,
                isGenerated:true,
                generationStrategy:"increment"
            },
            {
                name:"product_id",
                type:"int",
            },
            {
                name:"image_url",
                type:"varchar",
            },
            {
                name:"alt_text",
                type:"varchar",
            },
            ],
        }));
        await queryRunner.createForeignKey(
            'product_image',
            new TableForeignKey({
                columnNames:['product_id'],
                referencedColumnNames:['product_id'],
                referencedTableName:'products'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_image')
    }

}
