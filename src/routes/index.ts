import { Router } from 'express';
import carsRouter from '../api/routes/cars.route';
import usersRouter from '../api/routes/users.route';

const routes = Router();

routes.use('/car', carsRouter);
routes.use('/user', usersRouter);

export default routes;
