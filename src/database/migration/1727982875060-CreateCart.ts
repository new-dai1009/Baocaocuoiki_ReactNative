import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCart1727982875060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"cart",
            columns:[{
                name:"cart_id",
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
        await queryRunner.createForeignKey(
            'cart',
            new TableForeignKey({
                columnNames:['user_id'],
                referencedColumnNames:['user_id'],
                referencedTableName:'users',
                onDelete: 'CASCADE', 
                onUpdate: 'CASCADE',  
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('cart')

    }

}
