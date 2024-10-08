import { Request, Response } from 'express';
import CreateUserService from '../services/UserServices/CreateUserService';
import DeleteUserService from '../services/UserServices/DeleteUserService';
import ShowUserService from '../services/UserServices/ShowUserService';
import UpdateUserService from '../services/UserServices/UpdateUserService';


export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { name, cpf, birth, cep, email, password, } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            cpf,
            birth,
            cep,
            email,
            password,
        });
         response.status(201).json(user);
    }

    public async show(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        const showUser = new ShowUserService();

        const user = await showUser.execute({ id });

        response.status(200).json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<void> {
        const {  
            name,
            cpf,
            birth,
            cep,
            email,
            password, } = request.body;
        const { id } = request.params;

        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id,
            name,
            cpf,
            birth,
            cep,
            email,
            password,
        });
        response.status(200).json(user);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { id } = request.params;

        const deleteUser = new DeleteUserService();

        await deleteUser.execute({ id });

        response.sendStatus(204);
    }

}