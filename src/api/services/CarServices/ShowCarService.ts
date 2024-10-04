import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';


interface IRequest {
    id: string;
}

class ShowCarService {
    public async execute({ id }: IRequest): Promise<Car> {
        const carRepository = AppDataSource.getRepository(Car);
        const numberId = parseInt(id);
        const car = await carRepository.findOne({
            where: { id: numberId }
        });

        if (!car) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há carro com esse id'
            );
        }
        
        return car;
    }
}

export default ShowCarService;
