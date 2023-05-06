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
import { EncryptService } from '../services/encrypt-service';

export class UserTouristGuideController {
  private _repository: Repository<User>;
  private _encryptService: EncryptService;

  constructor() {
    this._repository = AppDataSource.getRepository(User);
    this._encryptService = new EncryptService();
  }

  async create(
    request: Request<{}, {}, UserTouristGuideRequest>,
    response: Response
  ) {
    try {
      const userTouristGuide = await this._userTouristGuideToDomain(
        request.body
      );
      await this._repository.save(userTouristGuide);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch (err) {
      console.log(err);
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  private async _userTouristGuideToDomain(
    userTouristGuideRequest: UserTouristGuideRequest
  ): Promise<User> {
    const user = new User();

    user.name = userTouristGuideRequest.name;
    user.email = userTouristGuideRequest.email;
    user.phone = userTouristGuideRequest.phone;
    user.password = await this._encryptService.encrypt(
      userTouristGuideRequest.password
    );
    user.role = this._touristGuideRoleToDomain();

    return user;
  }

  private _touristGuideRoleToDomain(): Role {
    const role = new Role();
    role.id = 2;

    return role;
  }
}
