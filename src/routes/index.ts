import { Router } from 'express';
import carsRouter from '../api/routes/cars.route';
import usersRouter from '../api/routes/users.route';
import authRouter from '../api/routes/auth.route';
import reservesRouter from '../api/routes/reserves.route';

const routes = Router();

routes.use('/car', carsRouter);
routes.use('/user', usersRouter);
routes.use('/auth', authRouter);
routes.use('/reserve', reservesRouter);

export default routes;
