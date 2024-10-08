import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import AppError from '../../middlewares/AppError';

interface IReserve {
    id: number;
    startDate: Date;
    endDate: Date;
    finalValue: number;
    userId: number;
    carId: number;
    
}

class ListReserveService {
    public async execute(userId: number, queryParams: Partial<IReserve>): Promise<IReserve[]> {
        const reserveRepository = AppDataSource.getRepository(Reserve);

        const { ...restParams } = queryParams;

        const reserves = await reserveRepository.find({
            where: {
                user: {id: userId},
                ...restParams
            }, relations: ['car', 'user']

        });

        if (reserves.length === 0) {
            throw new AppError(
                400,
                'Bad Request',
                'A reserva não foi encontrado na nossa base de dados'
            );
        }

        return reserves.map(reserve => ({
            id: reserve.id,
            startDate: reserve.startDate,
            endDate: reserve.endDate,
            finalValue: reserve.finalValue,
            userId: reserve.user.id,
            carId: reserve.car.id
        }));
    }
}

export default ListReserveService;
