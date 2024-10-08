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
                400, 
                'Bad Request', 
                'O Carro não foi encontrado na nossa base de dados'
            );
        }
        
        return car;
    }
}

export default ShowCarService;
