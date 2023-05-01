import { MigrationInterface, QueryRunner } from 'typeorm';
import { DifficultLevel } from '../../entities/difficult-level';

export class createDificultLevels1681071066110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(DifficultLevel)
      .values([
        { value: 'easy' },
        { value: 'moderate' },
        { value: 'difficult' }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
