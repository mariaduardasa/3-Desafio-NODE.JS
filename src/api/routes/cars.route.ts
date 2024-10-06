import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CarsController from '../controllers/cars.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const carsRouter = Router();
const carsController = new CarsController();


carsRouter.post(
    '/', isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            model: Joi.string().required(),
            color: Joi.string().required(),
            year:Joi.number().min(1950).max(2023).required(),
            valuePerDay: Joi.number().required(),
            acessories:Joi.array()
                .items(Joi.object({
                    name: Joi.string().required(),
                }))
                .min(1),
            numberOfPassengers: Joi.number().required(),
        },
    }),
    carsController.create,
);

carsRouter.get(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    carsController.show,
);


carsRouter.get('/', isAuthenticated, carsController.index);

carsRouter.put(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
        [Segments.BODY]: {
            model: Joi.string().optional(),
            color: Joi.string().optional(),
            year:Joi.number().min(1950).max(2023).optional(),
            valuePerDay: Joi.number().optional(),
            acessories:Joi.array()
                .items(Joi.object({
                    name: Joi.string().optional(),
                }))
                .min(1),
            numberOfPassengers: Joi.number().optional(),
        },
    }),
    carsController.update,
);

carsRouter.patch(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
        },
    }),
    carsController.updateAccessory,
);

carsRouter.delete(
    '/:id', isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    carsController.delete,
);



export default carsRouter;
