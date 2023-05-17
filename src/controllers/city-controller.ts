import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { City } from '../entities/city';
import {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE
} from '../contracts/response-status';
import { AssociationRequest } from './interfaces/request/association-request';

export class CityController {
  private _repository: Repository<City>;

  constructor() {
    this._repository = AppDataSource.getRepository(City);
  }

  async find(request: Request, response: Response) {
    const cities = await this._repository.find({
      relations: {
          state: true
      },
      order: { value: 'asc'}
    });

    response.status(SUCCESS_STATUS_CODE).send(cities);
  }
}
