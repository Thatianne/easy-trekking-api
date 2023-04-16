import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';
import { UserAdminController } from '../controllers/user-admin-controller';

const AdminRoute = Router();
const trekkingController = new TrekkingController();
const userAdminControlller = new UserAdminController();

AdminRoute.get('/trekkings', trekkingController.find.bind(trekkingController));
AdminRoute.get('/trekkings/:id', trekkingController.findById.bind(trekkingController));
AdminRoute.post('/trekkings', trekkingController.create.bind(trekkingController));
AdminRoute.put('/trekkings/:id', trekkingController.update.bind(trekkingController));
AdminRoute.delete('/trekkings/:id', trekkingController.delete.bind(trekkingController));

AdminRoute.post('/admin', userAdminControlller.create.bind(userAdminControlller));

export { AdminRoute };
