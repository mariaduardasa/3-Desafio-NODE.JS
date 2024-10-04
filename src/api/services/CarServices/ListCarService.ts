import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';

class ListCarService {
    public async execute(queryParams: Partial<Car>): Promise<Car[]> {
        const carRepository = AppDataSource.getRepository(Car);

        const { ...restParams } = queryParams;

        const cars = await carRepository.find({
            where: restParams, 
        });

        if (cars.length === 0) {
            throw new AppError(
                400,
                'Bad Request',
                'Nenhum carro encontrado com esses parâmetros'
            );
        }

        return cars;
    }
}

export default ListCarService;
