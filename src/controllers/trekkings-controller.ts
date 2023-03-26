import {Request, Response} from "express";
import { AppDataSource } from '../database/configuration/db'
import { Trekking } from '../entities/trekking';

export class TrekkingsController {
  async list(request: Request, response: Response) {
    const trekkingRepository = AppDataSource.getRepository(Trekking);

    const data = await trekkingRepository.find();

    response.send(data);
  }
}
