import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();
const usersController = new UsersController();


usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string().min(14).required(),
            birth: Joi.string().required(),
            cep: Joi.string().min(9).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
   
    usersController.create,
);

usersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    usersController.show,
);

usersRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().optional(),
            cpf: Joi.string().min(14).optional(),
            birth: Joi.string().optional(),
            cep: Joi.string().min(9).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).optional(),
        },
    }),
    usersController.update,
);

usersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),

    usersController.delete,
);

export default usersRouter;