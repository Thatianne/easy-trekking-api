import { MigrationInterface, QueryRunner } from "typeorm"
import { State } from "../../entities/state";

export class createStates1681071274866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into(State)
        .values([
          // { name: 'Acre', value: 'AC'},
          // { name: 'Alagoas', value: 'AL'},
          // { name: 'Amapá', value: 'AP'},
          // { name: 'Amazonas', value: 'AM'},
          // { name: 'Bahia', value: 'BA'},
          // { name: 'Ceara', value: 'CE'},
          // { name: 'Distrito Federal', value: 'DF'},
          // { name: 'Espírito Santo', value: 'ES'},
          // { name: 'Goiás', value: 'GO'},
          // { name: 'Maranhão', value: 'MA'},
          // { name: 'Mato Grosso', value: 'MT'},
          // { name: 'Mato Grosso do Sul', value: 'MS'},
          // { name: 'Minas Gerais', value: 'MG'},
          // { name: 'Pará', value: 'PA'},
          // { name: 'Paraíba	João', value: 'PB'},
          // { name: 'Paraná', value: 'PR'},
          // { name: 'Pernambuco', value: 'PE'},
          // { name: 'Piauí', value: 'PI'},
          // { name: 'Rio de Janeiro', value: 'RJ'},
          // { name: 'Rio Grande do Norte', value: 'RN'},
          // { name: 'Rio Grande do Sul', value: 'RS'},
          // { name: 'Rondônia', value: 'RO'},
          // { name: 'Roraima	Boa', value: 'RR'},
          // { name: 'Santa Catarina', value: 'SC'},
          // { name: 'São Paulo	São', value: 'SP'},
          // { name: 'Sergipe', value: 'SE'},
          // { name: 'Tocantins', value: 'TO'}
          { value: 'AC'},
          { value: 'AL'},
          { value: 'AP'},
          { value: 'AM'},
          { value: 'BA'},
          { value: 'CE'},
          { value: 'DF'},
          { value: 'ES'},
          { value: 'GO'},
          { value: 'MA'},
          { value: 'MT'},
          { value: 'MS'},
          { value: 'MG'},
          { value: 'PA'},
          { value: 'PB'},
          { value: 'PR'},
          { value: 'PE'},
          { value: 'PI'},
          { value: 'RJ'},
          { value: 'RN'},
          { value: 'RS'},
          { value: 'RO'},
          { value: 'RR'},
          { value: 'SC'},
          { value: 'SP'},
          { value: 'SE'},
          { value: 'TO'}
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
