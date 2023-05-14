import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserLoginRequest } from './interfaces/request/user-request';
import {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE
} from '../contracts/response-status';
import { EncryptService } from '../services/encrypt-service';

export class UserController {
  private _repository: Repository<User>;
  private _encryptService: EncryptService;

  constructor() {
    this._repository = AppDataSource.getRepository(User);
    this._encryptService = new EncryptService();
  }

  async login(request: Request<{}, {}, UserLoginRequest>, response: Response) {
    try {
      const encryptedPassword = await this._encryptService.encrypt(
        request.body.password
      );

      const user = await this._repository.findOne({
        where: {
          email: request.body.email,
          password: encryptedPassword
        },
        relations: {
          role: true
        }
      });

      if (!user) {
        return response.status(NOT_FOUND_STATUS_CODE).send();
      }

      response.status(SUCCESS_STATUS_CODE).send(user);
    } catch (err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }
}
