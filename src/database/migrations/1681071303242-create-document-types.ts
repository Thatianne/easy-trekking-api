import { MigrationInterface, QueryRunner } from "typeorm"
import { DocumentType } from "../../entities/document-type";

export class createDocumentTypes1681071303242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into(DocumentType)
        .values([
            { value: 'rg'},
            { value: 'cpf'},
            { value: 'association_card'}
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
