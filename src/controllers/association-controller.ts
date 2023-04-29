import { Request, Response } from "express";
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { Association } from '../entities/association';
import { SUCCESS_STATUS_CODE, BAD_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE } from "../contracts/response-status";
import { AssociationRequest } from "./interfaces/request/association-request";

export class AssociationController {
  private _repository: Repository<Association>;

  constructor() {
    this._repository = AppDataSource.getRepository(Association);
  }

  async create(request: Request<{}, {}, AssociationRequest>, response: Response) {
    try {
      const association = this._associationToDomain(request.body);
      await this._repository.save(association);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch(err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  async find(request: Request, response: Response) {
    const associations = await this._repository.find();

    response.status(SUCCESS_STATUS_CODE).send(associations);
  }

  async delete(request: Request<{ id: string }>, response: Response) {
    const association = new Association();
    association.id = +request.params.id
    await this._repository.delete(association);

    response.status(SUCCESS_STATUS_CODE).send();
  }

  private _associationToDomain(userAdminRequest: AssociationRequest): Association {
    const association = new Association();
    association.value = userAdminRequest.name;

    return association;
  }


}
