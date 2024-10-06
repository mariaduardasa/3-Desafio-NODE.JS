import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
    authController.create,
);

export default authRouter;