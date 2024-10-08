import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';

interface IRequest {
    id: string;
    accessoryName: string;  
}

class UpdateAccessoryCarService {
    public async execute({
         id, 
         accessoryName 
        }: IRequest): Promise<Car> {
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

        car.acessories = car.acessories || [];
        
        const accessoryExists = car.acessories.some(
            accessory => accessory.name === accessoryName
        );

        if (accessoryExists) {
            if (car.acessories.length === 1) {
                throw new AppError(
                    400,
                    'Bad Request',
                    'É necessário ter pelo menos um acessório',
                );
            }
            car.acessories = car.acessories.filter(
                accessory => accessory.name !== accessoryName
            );
        } else {
            car.acessories.push({ name: accessoryName });
        }

                await carRepository.save(car);

        return car;
    }
}

export default UpdateAccessoryCarService;
