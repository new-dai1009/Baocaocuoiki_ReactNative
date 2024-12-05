import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCategories1727984508468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"categories",
            columns:[{
                name:"category_id",
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
                isNullable:true
            },
            {
                name: "created_at",
                type: "timestamp",
                default: 'CURRENT_TIMESTAMP', 
            },
            {
                name: "updated_at",
                type: "timestamp",
                default: 'CURRENT_TIMESTAMP',
            },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories')
    }

}
