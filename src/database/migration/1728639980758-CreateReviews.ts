import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReviews1728639980758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng reviews
        await queryRunner.createTable(
            new Table({
                name: "reviews",
                columns: [
                    {
                        name: "review_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "rating",
                        type: "int",
                    },
                    {
                        name: "comment",
                        type: "text",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: "product_id",  // Cột product_id
                        type: "integer",
                    },
                    {
                        name: "user_id",  // Cột user_id
                        type: "integer",
                    }
                ],
            })
        );

        // Foreign key cho product_id
        await queryRunner.createForeignKey(
            'reviews',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['product_id'],
                referencedTableName: 'products',
                onUpdate: 'CASCADE',
            })
        );

        // Foreign key cho user_id
        await queryRunner.createForeignKey(
            'reviews',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'users',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa bảng reviews nếu rollback
        await queryRunner.dropTable('reviews');
    }
}
