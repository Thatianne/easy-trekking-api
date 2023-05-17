import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';
import { UserAdminController } from '../controllers/user-admin-controller';
import { UserTouristGuideController } from '../controllers/user-tourist-guide-controller';
import { UserTouristController } from '../controllers/user-tourist-controller';
import { UserController } from '../controllers/user-controller';
import { AssociationController } from '../controllers/association-controller';
import { InviteController } from '../controllers/invite-controller';
import { StateController } from '../controllers/state-controller';
import { CityController } from '../controllers/city-controller';

const Routes = Router();
const trekkingController = new TrekkingController();
const userAdminControlller = new UserAdminController();
const userTouristGuideControlller = new UserTouristGuideController();
const userTouristController = new UserTouristController();
const associationController = new AssociationController();
const inviteController = new InviteController();
const userController = new UserController();
const stateController = new StateController();
const cityController = new CityController();

Routes.get(
  '/trekkings/able-to-guide',
  trekkingController.listAbleToGuideTrekkings.bind(trekkingController)
);
Routes.get('/trekkings', trekkingController.find.bind(trekkingController));
Routes.get(
  '/trekkings/:id',
  trekkingController.findById.bind(trekkingController)
);
Routes.post(
  '/trekkings/able-to-guide',
  trekkingController.defineAbleToGuideTrekkings.bind(trekkingController)
);
Routes.post(
  '/trekkings/:id/subscribe',
  trekkingController.subscribe.bind(trekkingController)
);
Routes.post('/trekkings', trekkingController.create.bind(trekkingController));
Routes.put(
  '/trekkings/:id',
  trekkingController.update.bind(trekkingController)
);
Routes.delete(
  '/trekkings/:id',
  trekkingController.delete.bind(trekkingController)
);

Routes.post(
  '/associations',
  associationController.create.bind(associationController)
);
Routes.get(
  '/associations',
  associationController.find.bind(associationController)
);
Routes.delete(
  '/associations/:id',
  associationController.delete.bind(associationController)
);

Routes.post(
  '/tourist-guides',
  userTouristGuideControlller.create.bind(userTouristGuideControlller)
);

Routes.post('/admins', userAdminControlller.create.bind(userAdminControlller));

Routes.post(
  '/tourists',
  userTouristController.create.bind(userTouristController)
);

Routes.post('/login', userController.login.bind(userController));

Routes.get('/invite/accept', inviteController.accept.bind(inviteController));

Routes.get(
  '/states',
  stateController.find.bind(stateController)
);
Routes.get(
  '/cities',
  cityController.find.bind(cityController)
);

export { Routes };
