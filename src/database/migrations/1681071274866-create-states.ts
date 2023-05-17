import { MigrationInterface, QueryRunner } from 'typeorm';
import { State } from '../../entities/state';

export class createStates1681071274866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(State)
      .values([
        { value: 'Acre' },
        { value: 'Alagoas' },
        { value: 'Amapá' },
        { value: 'Amazonas' },
        { value: 'Bahia' },
        { value: 'Ceara' },
        { value: 'Distrito Federal' },
        { value: 'Espírito Santo' },
        { value: 'Goiás' },
        { value: 'Maranhão' },
        { value: 'Mato Grosso' },
        { value: 'Mato Grosso do Sul' },
        { value: 'Minas Gerais' },
        { value: 'Pará' },
        { value: 'Paraíba João' },
        { value: 'Paraná' },
        { value: 'Pernambuco' },
        { value: 'Piauí' },
        { value: 'Rio de Janeiro' },
        { value: 'Rio Grande do Norte' },
        { value: 'Rio Grande do Sul' },
        { value: 'Rondônia' },
        { value: 'Roraima Boa' },
        { value: 'Santa Catarina' },
        { value: 'São Paulo	São' },
        { value: 'Sergipe' },
        { value: 'Tocantins' }
        // { value: 'AC' },
        // { value: 'AL' },
        // { value: 'AP' },
        // { value: 'AM' },
        // { value: 'BA' },
        // { value: 'CE' },
        // { value: 'DF' },
        // { value: 'ES' },
        // { value: 'GO' },
        // { value: 'MA' },
        // { value: 'MT' },
        // { value: 'MS' },
        // { value: 'MG' },
        // { value: 'PA' },
        // { value: 'PB' },
        // { value: 'PR' },
        // { value: 'PE' },
        // { value: 'PI' },
        // { value: 'RJ' },
        // { value: 'RN' },
        // { value: 'RS' },
        // { value: 'RO' },
        // { value: 'RR' },
        // { value: 'SC' },
        // { value: 'SP' },
        // { value: 'SE' },
        // { value: 'TO' }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
