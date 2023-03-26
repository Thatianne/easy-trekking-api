import { Association } from './association'
import { City } from './city'
import { DifficultLevel } from './difficult-level'
import { DocumentType } from './document-type'
import { GroupStatus } from './group-status'
import { Group } from './group'
import { PaymentStatus } from './payment-status'
import { Role } from './role'
import { State } from './state'
import { TouristGuideRate } from './tourist-guide-rate'
import { TouristUserGroup } from './tourist-user-group'
import { TrekkingDescription } from './trekking-description'
import { TrekkingImage } from './trekking-image'
import { TrekkingPrice } from './trekking-price'
import { TrekkingRate } from './trekking-rate'
import { Trekking } from './trekking'
import { UserDocument } from './user-document'
import { User } from './user'

const AvailableEntities = [
  Association,
  City,
  DifficultLevel,
  DocumentType,
  GroupStatus,
  Group,
  PaymentStatus,
  Role,
  State,
  TouristGuideRate,
  TouristUserGroup,
  TrekkingDescription,
  TrekkingImage,
  TrekkingPrice,
  TrekkingRate,
  Trekking,
  UserDocument,
  User
];

export { AvailableEntities }
