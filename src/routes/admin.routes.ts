import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';

const AdminRoute = Router();
const trekkingController = new TrekkingController();

AdminRoute.get('/trekkings', trekkingController.find.bind(trekkingController));
AdminRoute.post('/trekkings', trekkingController.create.bind(trekkingController));
AdminRoute.put('/trekkings/:id', trekkingController.update.bind(trekkingController));
AdminRoute.delete('/trekkings/:id', trekkingController.delete.bind(trekkingController));

export { AdminRoute };
