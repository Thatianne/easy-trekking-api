import { Request, Response } from "express";
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserAdminRequest } from "./interfaces/request/user-admin-request";
import { SUCCESS_STATUS_CODE, BAD_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE } from "../contracts/response-status";

export class UserAdminController {
  private _repository: Repository<User>;

  constructor() {
    this._repository = AppDataSource.getRepository(User);
  }

  async create(request: Request<{}, {}, UserAdminRequest>, response: Response) {
    try {
      const userAdmin = this._userAdminToDomain(request.body);
      await this._repository.save(userAdmin);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch(err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  private _userAdminToDomain(userAdminRequest: UserAdminRequest): User {
    const user = new User();

    user.name = userAdminRequest.email;
    user.email = userAdminRequest.email;
    user.password = userAdminRequest.password; // TODO encrypt password
    user.role = this._adminRoleToDomain();

    return user;
  }

  private _adminRoleToDomain(): Role {
    const role = new Role();
    role.id = 1;

    return role;
  }

}
