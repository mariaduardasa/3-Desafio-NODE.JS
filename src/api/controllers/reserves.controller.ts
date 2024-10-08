import { Request, Response } from 'express';
import CreateReserveService from '../services/ReserveServices/CreateReserveService';
import ListReserveService from '../services/ReserveServices/ListReserveService';
import ShowReserveService from '../services/ReserveServices/ShowReserveService';
import DeleteReserveService from '../services/ReserveServices/DeleteReseveService';
import UpdateReserveService from '../services/ReserveServices/UpdateReserveService';

interface IRequest extends Request {
    user?: {
        id: number;
    };
}

export default class ReservesController {
    public async create(
        request: IRequest,
        response: Response,
    ): Promise<void> {
        const { startDate, endDate, carId } = request.body;
        const userId = request.user?.id;

        const createReserve = new CreateReserveService();

        const reserve = await createReserve.execute(
            { startDate, endDate, carId },
            userId
        );

        response.status(201).json(reserve);
    }

    public async index(
        request: IRequest,
        response: Response,
    ): Promise<void> {
        const userId = request.user?.id;

        const listReserves = new ListReserveService();

        const queryParams = request.query;

        const reserves = await listReserves.execute( userId, queryParams);

        response.status(200).json({reserves});
    }

    public async show(
        request: IRequest, 
        response: Response): 
        Promise<void> {
        const { id } = request.params;
        const userId = request.user?.id;

        const showReserve = new ShowReserveService();

        const reserve = await showReserve.execute({ id }, userId);

        response.status(200).json(reserve);
    }

    public async delete(
        request: IRequest,
        response: Response,
    ): Promise<void> {
        const { id } = request.params;
        const userId = request.user?.id;

        const deleteReserve = new DeleteReserveService();

        await deleteReserve.execute({ id }, userId);

        response.sendStatus(204);
    }

    public async update(
        request: IRequest,
        response: Response,
    ): Promise<void> {
        const { id } = request.params;
        const { startDate, endDate, carId } = request.body;
        const userId = request.user?.id;

        const updateReserve = new UpdateReserveService();

        const reserve = await updateReserve.execute({
            id,
            startDate, 
            endDate, 
            carId
        }, userId);
        response.status(200).json(reserve);
    }
}
