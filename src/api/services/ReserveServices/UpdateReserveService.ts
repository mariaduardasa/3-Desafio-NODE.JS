import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import formatDate from '../../middlewares/formatDate';
import AppError from '../../middlewares/AppError';
import { Car } from '../../../database/entities/Car';
import { User } from '../../../database/entities/User';


interface IRequest {
    startDate?: string;
    endDate?: string;
    carId?: number;
}

interface IResponse {
    id: number;
    startDate: string;
    endDate: string;
    carId: number;
    userId: number;
    finalValue: number;
}

class UpdateReserveService {
    public async execute({
        id,
        startDate,
        endDate,
        carId,
    }: IRequest & {id: string}, userId: number, ): Promise<IResponse> {
        const reserveRepository = AppDataSource.getRepository(Reserve);
        const carRepository = AppDataSource.getRepository(Car);
        const userRepository = AppDataSource.getRepository(User);

        const numberId = parseInt(id);
        const reserve = await reserveRepository.findOne({
            where: { id: numberId, user: {id: userId} }, 
            relations: ['user']
        });

        if (!reserve) {
            throw new AppError(
                400,
                'Bad Request',
                'A reserva não foi encontrado na nossa base de dados'
            );
        }


        if(carId){
        const car = await carRepository.findOneBy({ id: carId });
        if (!car) {
            throw new AppError(
                400, 
                'Bad Request', 
                'O Carro não foi encontrado na nossa base de dados'
            );
        }
        reserve.car = car;
        }

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new AppError(
                400, 
                'Bad Request', 
                'Não há usuário com esse id'
            );
        }

        const age = new Date().getFullYear() - new Date(user.birth).getFullYear();
        if (age < 18) {
            throw new AppError(
                400, 
                'Bad Request', 
                'Usuário deve ter mais que 18 anos'
            );
        }

        if(startDate && endDate){
        const conflictQuery = reserveRepository.createQueryBuilder('reserve')
            .where('reserve.userId = :userId', { userId })
            .andWhere('(:startDate <= reserve.endDate AND :endDate >= reserve.startDate)', {
                startDate,
                endDate,
            });

        const conflict = await conflictQuery.getOne();
        if (conflict && conflict.id!== reserve.id) { 
            throw new AppError(
                400, 
                'Bad Request', 
                'O usuário atual já tem uma reserva no mesmo horário para qualquer carro'
            );
        }
        }
        const start = new Date(startDate.split('/').reverse().join('-')); 
        const end = new Date(endDate.split('/').reverse().join('-'));

        const daysReserved = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const finalValue = daysReserved * reserve.car.valuePerDay;

        let formattedStartDate;
        try {
            formattedStartDate = await formatDate(startDate);
        } catch (_error) {
            throw new AppError(
                400,
                'Bad Request',
                'startDate não está no padrão dd/mm/yyyy'
            );
        }

        let formattedEndDate;
        try {
            formattedEndDate = await formatDate(endDate);
        } catch (_error) {
            throw new AppError(
                400,
                'Bad Request',
                'endDate não está no padrão dd/mm/yyyy'
            );
        }

        reserve.startDate = formattedStartDate;
        reserve.endDate = formattedEndDate;
        reserve.finalValue = finalValue
        

        await reserveRepository.save(reserve);

        return {
            id: reserve.id,
            startDate: formattedStartDate ?? reserve.startDate,
            endDate: formattedEndDate ?? reserve.endDate,
            finalValue,
            carId: reserve.car.id ?? reserve.id,
            userId: reserve.user.id, 
        };
    }
}

export default UpdateReserveService;
