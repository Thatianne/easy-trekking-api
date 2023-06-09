import fs from 'fs';
import { Request, Response } from 'express';
import { FindManyOptions, Repository, In, Between, Like } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { Trekking } from '../entities/trekking';
import {
  TrekkingRequest,
  TrekkingFindRequest,
  SubscribeTrekkingRequest,
  DefineAbleToGuideTrekkingsRequest
} from './interfaces/request/trekking-request';
import { TrekkingDescription } from '../entities/trekking-description';
import { TrekkingPrice } from '../entities/trekking-price';
import {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE
} from '../contracts/response-status';
import { State } from '../entities/state';
import { City } from '../entities/city';
import { Group } from '../entities/group';
import { TouristUserGroup } from '../entities/tourist-user-group';
import { User } from '../entities/user';
import { DifficultLevel } from '../entities/difficult-level';
import { PaymentStatus } from '../entities/payment-status';
import { GroupStatus } from '../entities/group-status';
import { TrekkingImage } from '../entities/trekking-image';
import { RoleEnum } from '../enums/role.enum';
import { PaymentStatusEnum } from '../enums/payment-status.enum';
import { GroupStatusEnum } from '../enums/group-status.enum';
import { TrekkingFindWhereOption } from './interfaces/repository/trekking-find';

export class TrekkingController {
  private _repository: Repository<Trekking>;
  private _userRepository: Repository<User>;
  private _groupRepository: Repository<Group>;
  private _touristUserGroupRepository: Repository<TouristUserGroup>;
  private _findOptions: FindManyOptions = {
    relations: {
      state: true,
      city: true,
      difficultLevel: true,
      descriptions: true,
      images: true,
      prices: true
    }
  };

  constructor() {
    this._repository = AppDataSource.getRepository(Trekking);
    this._userRepository = AppDataSource.getRepository(User);
    this._groupRepository = AppDataSource.getRepository(Group);
    this._touristUserGroupRepository =
      AppDataSource.getRepository(TouristUserGroup);
  }

  async create(request: Request<{}, {}, TrekkingRequest>, response: Response) {
    try {
      const trekking = this._trekkingToDomain(request.body);
      await this._repository.save(trekking);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch (err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  async update(
    request: Request<{ id: string }, {}, TrekkingRequest>,
    response: Response
  ) {
    try {
      const trekking = this._trekkingToDomain(request.body);
      trekking.id = +request.params.id;
      await this._repository.save(trekking);

      response.status(SUCCESS_STATUS_CODE).send();
    } catch (err) {
      response.status(BAD_REQUEST_STATUS_CODE).send();
    }
  }

  async find(
    request: Request<{}, {}, {}, TrekkingFindRequest>,
    response: Response
  ) {
    const whereFilters: TrekkingFindWhereOption = {
      state: {
        id: request.query.state
      },
      city: {
        id: request.query.city
      },
      durationInHours: request.query.durationInHours,
      distanceInMeters: request.query.distanceInMeters,
      difficultLevel: {
        id: request.query.difficultLevel
      }
    };

    if (request.query.name) {
      whereFilters.name = Like(`%${request.query.name}%`);
    }

    if (request.query.ids) {
      whereFilters.id = In(request.query.ids.split(',').map((id) => +id));
    }

    let trekkings = await this._repository.find({
      where: whereFilters,
      relations: !request.query.isAvailable
        ? this._findOptions.relations
        : {
            ...this._findOptions.relations,
            touristGuides: true
          }
    });

    if (request.query.isAvailable) {
      trekkings = trekkings.filter(
        (trekking) => trekking.touristGuides.length >= 2
      );
    }

    response.status(SUCCESS_STATUS_CODE).send(trekkings);
  }

  async findById(request: Request<{ id: string }>, response: Response) {
    const trekkings = await this._repository.find({
      where: {
        id: +request.params.id
      },
      relations: this._findOptions.relations
    });

    if (trekkings.length === 0) {
      return response.status(NOT_FOUND_STATUS_CODE).send();
    }

    response.status(SUCCESS_STATUS_CODE).send(trekkings[0]);
  }

  async delete(request: Request<{ id: string }>, response: Response) {
    const trekking = new Trekking();
    trekking.id = +request.params.id;
    await this._repository.softDelete(trekking);

    response.status(SUCCESS_STATUS_CODE).send();
  }

  async defineAbleToGuideTrekkings(
    request: Request<{ userId: string }, {}, DefineAbleToGuideTrekkingsRequest>,
    response: Response
  ) {
    const user = await this._userRepository.findOne({
      where: {
        id: +request.params.userId
      },
      relations: {
        role: true,
        ableToGuideTrekkings: true
      }
    });

    if (!user) {
      console.error('User not found');
      return response.status(NOT_FOUND_STATUS_CODE).send();
    }

    if (user.role.id !== RoleEnum.TouristGuide) {
      console.error('User should be a tourist guide');
      return response.status(BAD_REQUEST_STATUS_CODE).send();
    }

    user.ableToGuideTrekkings = [];
    await this._userRepository.save(user);

    const trekkings: Trekking[] = [];
    for (let index = 0; index < request.body.trekkings.length; index++) {
      const trekkingId = request.body.trekkings[index];
      const trekking = await this._repository.findOne({
        where: {
          id: +trekkingId
        },
        relations: {
          touristGuides: true
        }
      });

      if (!trekking) {
        continue;
      }

      const touristGuide = new User();
      touristGuide.id = +request.params.userId;
      trekking.touristGuides.push(touristGuide);

      trekkings.push(trekking);
    }

    await this._repository.save(trekkings);
    response.status(SUCCESS_STATUS_CODE).send();
  }

  async listAbleToGuideTrekkings(
    request: Request<{ userId: string }>,
    response: Response
  ) {
    const trekkings = await this._repository.find({
      where: {
        touristGuides: {
          id: +request.params.userId
        }
      },
      relations: this._findOptions.relations
    });

    response.status(SUCCESS_STATUS_CODE).send(trekkings);
  }

  async subscribe(
    request: Request<{ trekkingId: string, userId: string }, {}, SubscribeTrekkingRequest>,
    response: Response
  ) {
    const trekking = await this._repository.findOneBy({
      id: +request.params.trekkingId
    });

    if (!trekking) {
      console.error('Trekking not found');
      return response.status(NOT_FOUND_STATUS_CODE).send({
        message: 'Trekking não encontrado'
      });
    }

    const user = await this._userRepository.findOne({
      where: {
        id: +request.params.userId
      },
      relations: {
        role: true
      }
    });

    if (!user) {
      console.error('User not found');
      return response.status(NOT_FOUND_STATUS_CODE).send({
        message: 'Usuário não encontrado'
      });
    }

    if (user.role.id !== RoleEnum.Tourist) {
      console.error('User should be a tourist');
      return response.status(BAD_REQUEST_STATUS_CODE).send({
        message: 'O usuário deve ser um turista'
      });
    }

    const date = new Date(request.body.date);

    const groups = await this._groupRepository.find({
      where: {
        date: Between(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            23,
            59,
            59
          )
        ),
        trekking: {
          id: +request.params.trekkingId
        }
      },
      relations: {
        groupStatus: true
      }
    });

    const availableGroups = groups.filter(
      async (group) => !(await this._groupIsFull(group, trekking))
    );

    let group: Group;

    if (availableGroups.length === 0) {
      const groupToCreate = this._groupToDomain(request.body, trekking);
      const addedGroup = await this._groupRepository.save(groupToCreate);
      group = await this._groupRepository.findOneOrFail({
        where: {
          id: +addedGroup.id
        },
        relations: {
          groupStatus: true
        }
      });
    } else {
      group = availableGroups[0];
    }
    group.trekking = trekking;

    if (user) {
      const existingTouristUserGroup =
        await this._touristUserGroupRepository.findOne({
          where: {
            user: {
              id: user.id
            },
            group: {
              id: group.id
            }
          }
        });

      if (!existingTouristUserGroup) {
        const touristUserGroup = new TouristUserGroup();
        touristUserGroup.group = group;
        touristUserGroup.user = user;
        const paymentStatus = new PaymentStatus();
        paymentStatus.id = PaymentStatusEnum.Total; // Ignore payment for first version
        touristUserGroup.paymentStatus = paymentStatus;

        await this._touristUserGroupRepository.save(touristUserGroup);
        return response.status(SUCCESS_STATUS_CODE).send(group);
      } else {
        return response.status(BAD_REQUEST_STATUS_CODE).send({
          message: 'Você já se encontrar inscrito para o trekking nesta data',
          code: 601,
          data: {
            group: group
          }
        })
      }
    }

    response.status(NOT_FOUND_STATUS_CODE).send();
  }

  private async _groupIsFull(
    group: Group,
    trekking: Trekking
  ): Promise<boolean> {
    const touristUserGroupCount = await this._touristUserGroupRepository.count({
      where: {
        group: {
          id: group.id
        }
      }
    });

    return touristUserGroupCount === trekking.maxPeople;
  }

  private _groupToDomain(
    subscribeTrekkingRequest: SubscribeTrekkingRequest,
    trekking: Trekking
  ): Group {
    const entity = new Group();
    const groupStatus = new GroupStatus();
    groupStatus.id = GroupStatusEnum.WaitingTourist;

    entity.name = `${trekking.name}-${this._generateRandomString(10)}`;
    entity.date = new Date(subscribeTrekkingRequest.date);
    entity.trekking = trekking;
    entity.groupStatus = groupStatus;
    return entity;
  }

  private _generateRandomString(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
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
    entity.description = trekkingRequest.description;
    entity.images = this._trekkingImageToDomain(trekkingRequest);

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

  private _difficultLevelToDomain(
    trekkingRequest: TrekkingRequest
  ): DifficultLevel {
    const difficultLevel = new DifficultLevel();
    difficultLevel.id = trekkingRequest.difficultLevel;

    return difficultLevel;
  }

  private _trekkingImageToDomain(trekkingRequest: TrekkingRequest): TrekkingImage[] {
    return trekkingRequest.images.map(imageRequest => {
      const trekkingImage = new TrekkingImage();
      trekkingImage.image = imageRequest.image;
      if (imageRequest.id) {
        trekkingImage.id = imageRequest.id;
      }

      return trekkingImage;
    });
  }

  private _descriptionsToDomain(
    trekkingRequest: TrekkingRequest
  ): TrekkingDescription[] {
    return trekkingRequest.descriptions.map((descriptionRequest) => {
      const trekkingDescription = new TrekkingDescription();
      trekkingDescription.description = descriptionRequest.description;
      if (descriptionRequest.id) {
        trekkingDescription.id = descriptionRequest.id;
      }
      return trekkingDescription;
    });
  }

  private _pricesToDomain(trekkingRequest: TrekkingRequest): TrekkingPrice[] {
    return trekkingRequest.prices.map((priceRequest) => {
      const trekkingPrice = new TrekkingPrice();
      trekkingPrice.startDate = new Date(priceRequest.startDate);
      trekkingPrice.endDate = new Date(priceRequest.endDate);
      trekkingPrice.price = priceRequest.price;
      if (priceRequest.id) {
        trekkingPrice.id = priceRequest.id;
      }

      return trekkingPrice;
    });
  }
}
