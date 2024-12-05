import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAddresses1731258609854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "addresses",
                columns: [
                    {
                        name: "address_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "street_address",
                        type: "varchar",
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "state",
                        type: "varchar",
                    },
                    {
                        name: "postal_code",
                        type: "varchar",
                    },
                    {
                        name: "country",
                        type: "varchar",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'addresses',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['user_id'], 
                referencedTableName: 'users',
                onDelete: 'CASCADE', 
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("addresses");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("addresses", foreignKey);
        }
        await queryRunner.dropTable("addresses");
    }
}
