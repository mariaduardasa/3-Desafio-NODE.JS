import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';

interface IRequest {
    id: string;
}

class DeleteCarService {
    public async execute({ id }: IRequest): Promise<void> {
        const carRepository = AppDataSource.getRepository(Car);
        const numberId = parseInt(id);
        const car = await carRepository.findOneBy({ id: numberId });

        if (!car) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há carro com esse id'
            );
        }

        
        await carRepository.remove(car);
    }
}

export default DeleteCarService;
