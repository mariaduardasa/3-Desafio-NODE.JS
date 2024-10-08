import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import AppError from '../../middlewares/AppError';

interface IRequest {
    id: string;
}

interface IReserve {
    id: number;
    startDate: Date;
    endDate: Date;
    finalValue: number;
    userId: number;
    carId: number;
    
}

class ListReserveService {
    public async execute({ id }: IRequest, userId: number): Promise<IReserve> {
        const reserveRepository = AppDataSource.getRepository(Reserve);

        const numberId = parseInt(id);
        const reserve = await reserveRepository.findOne({
            where: { id: numberId, user: {id: userId} },
            relations: ['car', 'user']
        });


        if (!reserve) {
            throw new AppError(
                400,
                'Bad Request',
                'A reserva não foi encontrado na nossa base de dados'
            );
        }

      

        return {
            id: reserve.id,
            startDate: reserve.startDate,
            endDate: reserve.endDate,
            finalValue: reserve.finalValue,
            userId: reserve.user.id,
            carId: reserve.car.id
        };
    }
}

export default ListReserveService;
