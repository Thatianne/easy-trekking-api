import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';

const AdminRoute = Router();
const trekkingController = new TrekkingController();

AdminRoute.get('/trekkings', trekkingController.list.bind(trekkingController));
AdminRoute.post('/trekkings', trekkingController.add.bind(trekkingController));

export { AdminRoute };
