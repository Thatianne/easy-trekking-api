import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserTouristRequest } from './interfaces/request/user-tourist-request';
import {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE
} from '../contracts/response-status';
import { Encrypt } from '../services/encrypt.service';

export class UserTouristController {
  private _repository: Repository<User>;
  private _encryptService: Encrypt

  constructor() {
    this._repository = AppDataSource.getRepository(User);
    this._encryptService = new Encrypt();
  }

  async create(
    request: Request<{}, {}, UserTouristRequest>,
    response: Response
  ) {
    try {
      const userAdmin = await this._userTouristToDomain(request.body);
      await this._repository.save(userAdmin);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch (err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  private async _userTouristToDomain(userTouristRequest: UserTouristRequest): Promise<User> {
    const user = new User();

    user.name = userTouristRequest.name;
    user.email = userTouristRequest.email;
    user.phone = userTouristRequest.phone;
    user.password = await this._encryptService.encrypt(userTouristRequest.password);
    user.role = this._touristRoleToDomain();

    return user;
  }

  private _touristRoleToDomain(): Role {
    const role = new Role();
    role.id = 3;

    return role;
  }
}
