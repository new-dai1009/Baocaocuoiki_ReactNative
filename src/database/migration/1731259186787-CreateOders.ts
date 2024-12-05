import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrders1731259186787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "order_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "order_date",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "total_amount",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "255",
                    }
                ],
            })
        );

        // Tạo khóa ngoại cho 'user_id'
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['user_id'], // Đảm bảo tên cột tham chiếu chính xác (sửa thành 'user_id' nếu cần)
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Lấy bảng 'orders' và xóa khóa ngoại
        const table = await queryRunner.getTable("orders");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("orders", foreignKey);
        }

        // Xóa bảng 'orders'
        await queryRunner.dropTable('orders');
    }
}
