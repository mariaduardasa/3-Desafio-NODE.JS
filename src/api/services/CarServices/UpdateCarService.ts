import { AppDataSource } from '../../../database/data-source';
import { Car } from '../../../database/entities/Car';
import AppError from '../../middlewares/AppError';


interface IRequest {
    id: string;
    model?: string;
    color?: string;
    year?: number;
    valuePerDay?: number;
    acessories?: { name: string}[];
    numberOfPassengers?: number;

}
class UpdateCarService {
    public async execute({
        id,
        model,
        color,
        year,
        valuePerDay,
        acessories,
        numberOfPassengers,
    }: IRequest): Promise<Car> {
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

        if (year &&(year < 1950 || year > 2023)) {
            throw new AppError(
                400,
                'Bad Request',
                'O ano de fabricação do carro deve estar entre 1950 e 2023',
            );
        }

        if(acessories !== undefined) {
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
            car.acessories = acessories;
        }
       
        if (model !== undefined) car. model =  model;
        if (color !== undefined) car.color = color;
        if (year !== undefined) car.year = year;
        if (valuePerDay !== undefined) car.valuePerDay = valuePerDay;
        if (numberOfPassengers !== undefined) car.numberOfPassengers = numberOfPassengers;
       

        await carRepository.save(car);


        return car;
    }
}

export default UpdateCarService;
