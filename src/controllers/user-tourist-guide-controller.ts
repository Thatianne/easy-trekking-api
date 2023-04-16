import { Request, Response } from "express";
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserTouristGuideRequest, DefineAbleToGuideTrekkingsRequest } from "./interfaces/request/user-tourist-guide-request";
import { SUCCESS_STATUS_CODE, BAD_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE } from "../contracts/response-status";
import { Trekking } from "../entities/trekking";

export class UserTouristGuideController {
  private _repository: Repository<User>;

  constructor() {
    this._repository = AppDataSource.getRepository(User);
  }

  async create(request: Request<{}, {}, UserTouristGuideRequest>, response: Response) {
    try {
      const userTouristGuide = this._userTouristGuideToDomain(request.body);
      await this._repository.save(userTouristGuide);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch(err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  async defineAbleToGuideTrekkings(request: Request<{ id: string }, {}, DefineAbleToGuideTrekkingsRequest>, response: Response) {
    const user = new User();

    user.id = +request.params.id;
    user.trekkings = request.body.trekkings.map((trekkingId) => {
      const trekking = new Trekking();
      trekking.id = trekkingId;

      return trekking;
    });

    this._repository.save(user);

    response.status(SUCCESS_STATUS_CODE).send();
  }

  private _userTouristGuideToDomain(userAdminRequest: UserTouristGuideRequest): User {
    const user = new User();

    user.name = userAdminRequest.email;
    user.email = userAdminRequest.email;
    user.password = userAdminRequest.password; // TODO encrypt password
    user.role = this._touristGuideRoleToDomain();

    return user;
  }

  private _touristGuideRoleToDomain(): Role {
    const role = new Role();
    role.id = 2;

    return role;
  }

}
