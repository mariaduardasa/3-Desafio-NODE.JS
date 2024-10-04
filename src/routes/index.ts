import { Router } from 'express';
import carsRouter from '../api/routes/cars.route';

const routes = Router();

routes.use('/car', carsRouter);

export default routes;
