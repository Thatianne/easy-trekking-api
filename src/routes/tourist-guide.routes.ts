import { Router } from 'express';
import { TrekkingController } from '../controllers/trekking-controller';

const TouristGuideRoute = Router();
const trekkingController = new TrekkingController();

// TouristGuideRoute.get('/trekkings', trekkingsController.list)

export { TouristGuideRoute };
