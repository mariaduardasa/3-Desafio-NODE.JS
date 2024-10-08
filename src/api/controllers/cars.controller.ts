import { Request, Response } from 'express';
import ShowCarService from '../services/CarServices/ShowCarService';
import UpdateCarService from '../services/CarServices/UpdateCarService';
import ListCarService from '../services/CarServices/ListCarService';
import DeleteCarService from '../services/CarServices/DeleteCarService';
import CreateCarService from '../services/CarServices/CreateCarService';
import UpdateAccessoryCarService from '../services/CarServices/UpdateAccessoryCarService';



export default class CarsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { model, color, year, valuePerDay, acessories, numberOfPassengers } = request.body;

        const createCar = new CreateCarService();

        const car = await createCar.execute({
            model,
            color,
            year,
            valuePerDay,
            acessories,
            numberOfPassengers,
            });

            response.status(201).json(car);
}


    public async show(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        const showCar = new ShowCarService();

        const car = await showCar.execute({ id });

        response.status(200).json(car);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<void> {
        const listCars = new ListCarService();

        const queryParams = request.query;

        const cars = await listCars.execute(queryParams);

        response.status(200).json(cars);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { model, color, year, valuePerDay, acessories,numberOfPassengers } = request.body;
        const { id } = request.params;

        const updateCar = new UpdateCarService();

        const car = await updateCar.execute({
            id,
            model,
            color,
            year,
            valuePerDay,
            acessories,
            numberOfPassengers,
        });

        response.status(200).json(car);
    }

    public async updateAccessory(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { id } = request.params;
        const { name } = request.body;

        const updateAccessoryCar  = new UpdateAccessoryCarService();

        const updatedCar = await updateAccessoryCar.execute({
            id,
            accessoryName: name,
        })

        response.status(200).json(updatedCar);
    }


    public async delete(
        request: Request,
        response: Response,
    ): Promise<void> {
        const { id } = request.params;

        const deleteCar = new DeleteCarService();

        await deleteCar.execute({ id });

        response.sendStatus(204);
    }

}
