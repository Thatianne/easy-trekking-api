import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';
import { UserAdminController } from '../controllers/user-admin-controller';
import { UserTouristGuideController } from '../controllers/user-tourist-guide-controller';
import { UserTouristController } from '../controllers/user-tourist-controller';
import { AssociationController } from '../controllers/association-controller';

const Routes = Router();
const trekkingController = new TrekkingController();
const userAdminControlller = new UserAdminController();
const userTouristGuideControlller = new UserTouristGuideController();
const userTouristController = new UserTouristController();
const associationController = new AssociationController();

Routes.get('/trekkings/able-to-guide', trekkingController.listAbleToGuideTrekkings.bind(trekkingController));
Routes.get('/trekkings', trekkingController.find.bind(trekkingController));
Routes.get('/trekkings/:id', trekkingController.findById.bind(trekkingController));
Routes.post('/trekkings/able-to-guide', trekkingController.defineAbleToGuideTrekkings.bind(trekkingController));
Routes.post('/trekkings/:id/subscribe', trekkingController.subscribe.bind(trekkingController));
Routes.post('/trekkings', trekkingController.create.bind(trekkingController));
Routes.put('/trekkings/:id', trekkingController.update.bind(trekkingController));
Routes.delete('/trekkings/:id', trekkingController.delete.bind(trekkingController));

Routes.post('/association', associationController.create.bind(associationController));
Routes.get('/association', associationController.find.bind(associationController));
Routes.delete('/association/:id', associationController.delete.bind(associationController));

Routes.post('/tourist-guide', userTouristGuideControlller.create.bind(userTouristGuideControlller));

Routes.post('/admin', userAdminControlller.create.bind(userAdminControlller));

Routes.post('/tourist', userTouristController.create.bind(userTouristController));

export { Routes };
