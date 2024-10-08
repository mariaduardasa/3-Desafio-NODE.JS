import { Request, Response } from 'express';
import CreateAuthService from '../services/AuthServices/CreateAuthService';

export default class AuthController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { email, password, } = request.body;

        const createAuth = new CreateAuthService();

        const { accessToken} = await createAuth.execute({
            email,
            password,
        });
         response.status(200).json({ accessToken });
    }

}