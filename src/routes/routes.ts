import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';
import { UserAdminController } from '../controllers/user-admin-controller';
import { UserTouristGuideController } from '../controllers/user-tourist-guide-controller';
import { AssociationeController } from '../controllers/association-controller';

const Routes = Router();
const trekkingController = new TrekkingController();
const userAdminControlller = new UserAdminController();
const userTouristGuideControlller = new UserTouristGuideController();
const associationeController = new AssociationeController();

Routes.get('/trekkings', trekkingController.find.bind(trekkingController));
Routes.get('/trekkings/:id', trekkingController.findById.bind(trekkingController));
Routes.post('/trekkings', trekkingController.create.bind(trekkingController));
Routes.put('/trekkings/:id', trekkingController.update.bind(trekkingController));
Routes.delete('/trekkings/:id', trekkingController.delete.bind(trekkingController));

Routes.post('/association', associationeController.create.bind(associationeController));
Routes.get('/association', associationeController.find.bind(associationeController));
Routes.delete('/association/:id', associationeController.delete.bind(associationeController));

Routes.post('/tourist-guide/:id/able-to-guide', userTouristGuideControlller.defineAbleToGuideTrekkings.bind(userTouristGuideControlller));

// Routes.post('/admin', userAdminControlller.create.bind(userAdminControlller));

export { Routes };
