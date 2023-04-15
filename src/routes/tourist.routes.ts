import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';

const TouristRoute = Router();
const trekkingController = new TrekkingController();

TouristRoute.get('/trekkings', trekkingController.list)

export { TouristRoute };
