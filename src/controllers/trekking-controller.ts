import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from '../database/configuration/db-data-source'
import { Trekking } from '../entities/trekking';
import { TrekkingRequest } from "./interfaces/request/trekking-request";
import { TrekkingDescription } from "../entities/trekking-description";
import { TrekkingPrice } from "../entities/trekking-price";
import { SUCCESS_STATUS_CODE, BAD_REQUEST_STATUS_CODE } from "../contracts/response-status";
import { State } from "../entities/state";
import { City } from "../entities/city";
import { DifficultLevel } from "../entities/difficult-level";

export class TrekkingController {
  private _repository: Repository<Trekking>;

  constructor() {
    this._repository = AppDataSource.getRepository(Trekking);
  }

  async list(request: Request, response: Response) {
    const data = await this._repository.find();

    response.send(data);
  }

  async add(request: Request<TrekkingRequest>, response: Response) {
    try {
      const trekking = this._trekkingToDomain(request.body);
      await this._repository.save(trekking);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch(err) {
      console.log(err)
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  private _trekkingToDomain(trekkingRequest: TrekkingRequest): Trekking {
    const entity = new Trekking();

    entity.name = trekkingRequest.name;
    entity.start = trekkingRequest.start;
    entity.end = trekkingRequest.end;
    entity.state = this._stateToDomain(trekkingRequest);
    entity.city = this._cityToDomain(trekkingRequest);
    entity.distanceInMeters = trekkingRequest.distanceInMeters;
    entity.durationInHours = trekkingRequest.durationInHours;
    entity.difficultLevel = this._difficultLevelToDomain(trekkingRequest);
    entity.descriptions = this._descriptionsToDomain(trekkingRequest);

    // entity.images = trekkingRequest.images;
    entity.prices = this._pricesToDomain(trekkingRequest);

    entity.minPeople = trekkingRequest.minPeople;
    entity.maxPeople = trekkingRequest.maxPeople;
    entity.daysFormGroup = trekkingRequest.daysFormGroup;
    entity.daysCompletePayment = trekkingRequest.daysCompletePayment;

    return entity;
  }

  private _stateToDomain(trekkingRequest: TrekkingRequest): State {
    const state = new State();
    state.id = trekkingRequest.state;

    return state;
  }

  private _cityToDomain(trekkingRequest: TrekkingRequest): City {
    const city = new City();
    city.id = trekkingRequest.city;

    return city;
  }

  private _difficultLevelToDomain(trekkingRequest: TrekkingRequest): DifficultLevel {
    const difficultLevel = new DifficultLevel();
    difficultLevel.id = trekkingRequest.difficultLevel;

    return difficultLevel;
  }

  private _descriptionsToDomain(trekkingRequest: TrekkingRequest): TrekkingDescription[] {
    return trekkingRequest.descriptions.map((descriptionRequest) => {
      const description = new TrekkingDescription();
      description.description = descriptionRequest;
      return description;
    });
  }

  private _pricesToDomain(trekkingRequest: TrekkingRequest): TrekkingPrice[] {
    return trekkingRequest.prices.map((priceRequest) => {
      const price = new TrekkingPrice();
      price.startDate = new Date(priceRequest.startDate);
      price.endDate = new Date(priceRequest.endDate);
      price.price = priceRequest.price;

      return price;
    });
  }

}
