import { MigrationInterface, QueryRunner } from "typeorm"
import { Role } from '../../entities/role'

export class createRoles1679868328173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([
          { value: 'administrator'},
          { value: 'tourist_guide'},
          { value: 'tourist'}
        ])
        .execute();
    }

    // TODO test rollback
    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.delete(Role, [
        { value: 'administrator'},
        { value: 'tourist_guide'},
        { value: 'tourist'}
      ]);
    }
}
