import {Request, Response} from "express";
import { AppDataSource } from '../config/db';
import { Trekking } from '../models/trekking';

export class TrekkingsController {
  async list(request: Request, response: Response) {
    const trekkingRepository = AppDataSource.getRepository(Trekking);

    const data = await trekkingRepository.find();

    response.send(data);
  }
}