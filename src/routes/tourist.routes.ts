import { Router } from 'express';
import { TrekkingsController } from '../controllers/trekkings.controller';

const TouristRoute = Router();
const trekkingsController = new TrekkingsController();

TouristRoute.get('/trekkings', trekkingsController.list)

export { TouristRoute };