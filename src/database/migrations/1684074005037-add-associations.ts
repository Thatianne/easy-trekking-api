import { MigrationInterface, QueryRunner } from "typeorm"
import { Association } from '../../entities/association';

export class addAssociations1684074005037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Association)
        .values([
          { value: 'Associação de Guias de Turismo de Petrópolis' },
          { value: 'Associação dos Condutores de Visitantes de Ibicoara/BA' },
          { value: 'Associação de Guia do Quilombo Kalunga' },
          { value: 'Associação de Condutores e Guias de Lençóis' },
          { value: 'Associação de Condutores de Visitantes do Vale do Capão' },
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
