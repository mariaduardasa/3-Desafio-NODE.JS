import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';
import ReserveController from '../controllers/reserves.controller';


const reservesRouter = Router();
const reserveController = new ReserveController();

reservesRouter.post(
    '/', isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
            carId: Joi.number().required()
        }
    }),
  reserveController.create,
);

reservesRouter.get('/', isAuthenticated, reserveController.index,);

reservesRouter.get(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    reserveController.show,
);

reservesRouter.put(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
        [Segments.BODY]: {
            startDate: Joi.string().optional(),
            endDate: Joi.string().optional(),
            carId: Joi.number().optional()
        }
    }),
  reserveController.update,
);

reservesRouter.delete(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    reserveController.delete,
);


export default reservesRouter;