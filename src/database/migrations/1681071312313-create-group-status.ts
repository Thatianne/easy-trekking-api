import { MigrationInterface, QueryRunner } from 'typeorm';
import { GroupStatus } from '../../entities/group-status';

export class createGroupStatus1681071312313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(GroupStatus)
      .values([
        { value: 'waiting_tourist' },
        { value: 'waiting_tourist_guide' },
        { value: 'confirmed' },
        { value: 'canceled' },
        { value: 'done' }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
