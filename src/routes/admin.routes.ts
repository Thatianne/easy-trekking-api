import { Router } from 'express';
import { TrekkingsController } from '../controllers/trekkings.controller';

const AdminRoute = Router();
const trekkingsController = new TrekkingsController();

AdminRoute.get('/trekkings', trekkingsController.list);

export { AdminRoute };