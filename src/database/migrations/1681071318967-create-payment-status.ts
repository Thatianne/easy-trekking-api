import { MigrationInterface, QueryRunner } from "typeorm"
import { PaymentStatus } from "../../entities/payment-status";

export class createPaymentStatus1681071318967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into(PaymentStatus)
        .values([
            { value: 'partial'},
            { value: 'total'}
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
