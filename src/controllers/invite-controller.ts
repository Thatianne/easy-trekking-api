import { Request, Response } from "express";
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/configuration/db-data-source';
import { Group } from '../entities/group';
import { User } from '../entities/user';
import { GroupStatus } from '../entities/group-status';
import { GroupStatusEnum } from '../enums/group-status.enum';
import { RoleEnum } from '../enums/role.enum';
import { SUCCESS_STATUS_CODE, BAD_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE } from "../contracts/response-status";
import { AcceptInviteRequest } from './interfaces/request/invite-request'

export class InviteController {
  private _groupRepository: Repository<Group>;
  private _userRepository: Repository<User>;

  constructor() {
    this._groupRepository = AppDataSource.getRepository(Group);
    this._userRepository = AppDataSource.getRepository(User);
  }

  async accept(request: Request<{}, {}, {}, AcceptInviteRequest>, response: Response) {
    console.log(request.query)
    const group = await this._groupRepository.findOne({
      where: {
        id: +request.query.groupId
      },
      relations: {
        trekking: true,
        groupStatus: true,
        lastTouristGuideInvited: true
      }
    });

    if (!group) {
      return response.status(NOT_FOUND_STATUS_CODE).send({
        message: "Group doesn't exists"
      });
    }

    const user = await this._userRepository.findOne({
      where: {
        id: +request.query.touristGuideId,
        role: {
          id: RoleEnum.TouristGuide
        }
      }
    })

    if (!user) {
      return response.status(NOT_FOUND_STATUS_CODE).send({
        message: "Tourist guide doesn't exists"
      });
    }

    if (group.groupStatus.id === GroupStatusEnum.Canceled) {
      const dueDate = new Date(group.date);
      dueDate.setDate(group.date.getDate() - group.trekking.daysFormGroup);

      dueDate.setHours(0, 0, 0, 0);
      return response.status(BAD_REQUEST_STATUS_CODE).send({
        message: `Time to confirm group ended, trekking should be confirmed until ${dueDate}`
      });
    }

    if (group.lastTouristGuideInvited?.id !== user.id) {
      return response.status(BAD_REQUEST_STATUS_CODE).send({
        message: 'Time to accept invite expired'
      });
    }

    const groupStatus = new GroupStatus();
    groupStatus.id = GroupStatusEnum.Confirmed;
    group.groupStatus = groupStatus;
    group.touristGuideUser = user;
    await this._groupRepository.save(group);

    response.status(SUCCESS_STATUS_CODE).send();
  }

}
