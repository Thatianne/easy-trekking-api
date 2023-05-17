import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { State } from '../entities/state';
import {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE
} from '../contracts/response-status';
import { AssociationRequest } from './interfaces/request/association-request';

export class StateController {
  private _repository: Repository<State>;

  constructor() {
    this._repository = AppDataSource.getRepository(State);
  }

  async find(request: Request, response: Response) {
    const states = await this._repository.find({ order: { value: 'asc'}});

    response.status(SUCCESS_STATUS_CODE).send(states);
  }
}
