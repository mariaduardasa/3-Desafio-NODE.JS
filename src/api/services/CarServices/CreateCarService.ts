import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';

interface IRequest {
    model: string;
    color: string;
    year: number;
    valuePerDay: number;
    acessories: { name: string }[];
    numberOfPassengers: number;
}

interface IResponse {
    id: number,
    model: string;
    color: string;
    year: number;
    valuePerDay: number;
    acessories: { name: string }[];
    numberOfPassengers: number;
}

class CreateCarService {
    public async execute({
        model,
        color,
        year,
        valuePerDay,
        acessories,
        numberOfPassengers,
    }: IRequest): Promise<IResponse> {
        const carRepository = AppDataSource.getRepository(Car);

        if (year < 1950 || year > 2023) {
            throw new AppError(
                400,
                'Bad Request',
                'O ano de fabricação do carro deve estar entre 1950 e 2023',
            );
        }

        if (acessories.length === 0) {
            throw new AppError(
                400,
                'Bad Request',
                'É necessário ter pelo menos um acessório',
            );
        }

        const uniqueAcessories = new Set(acessories.map(a => a.name));
        if (uniqueAcessories.size !== acessories.length) {
            throw new AppError(
                400,
                'Bad Request',
                'Não pode haver acessórios repetidos',
            );
        }


        const car = carRepository.create({
            model,
            color,
            year,
            valuePerDay,
            acessories,
            numberOfPassengers,
        });

        await carRepository.save(car);

        return {
            id: car.id,
            model,
            color,
            year,
            valuePerDay,
            acessories,
            numberOfPassengers,
        };
    }
}

export default CreateCarService;
