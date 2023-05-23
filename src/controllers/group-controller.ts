import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { Group } from '../entities/group';
import {
  SUCCESS_STATUS_CODE,
} from '../contracts/response-status';

export class GroupController {
  private _repository: Repository<Group>;

  constructor() {
    this._repository = AppDataSource.getRepository(Group);
  }

  async find(request: Request, response: Response) {
    const groups = await this._repository.find({
      relations: {
        trekking: true,
        touristGuideUser: true,
        tourists: {
          user: true,
          paymentStatus: true
        },
        groupStatus: true
      }
    });

    response.status(SUCCESS_STATUS_CODE).send(groups);
  }
}
