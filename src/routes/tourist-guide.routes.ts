import { Router } from 'express';
import { TrekkingsController } from '../controllers/trekkings-controller';

const TouristGuideRoute = Router();
const trekkingsController = new TrekkingsController();

TouristGuideRoute.get('/trekkings', trekkingsController.list)

export { TouristGuideRoute };
