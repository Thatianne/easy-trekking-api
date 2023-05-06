import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserTouristGuideRequest } from './interfaces/request/user-tourist-guide-request';
import {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE
} from '../contracts/response-status';

export class UserTouristGuideController {
  private _repository: Repository<User>;

  constructor() {
    this._repository = AppDataSource.getRepository(User);
  }

  async login(
    request: Request<{}, {}, UserTouristGuideRequest>,
    response: Response
  ) {
    await this._repository.findOne({
      where: {
        email: userTouristGuideRequest.email,
        password: userTouristGuideRequest.password
      }
    });
    response.status(SUCCESS_STATUS_CODE).send();
  }

}
