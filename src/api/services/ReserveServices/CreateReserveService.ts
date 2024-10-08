import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import formatDate from '../../middlewares/formatDate';
import AppError from '../../middlewares/AppError';
import { Car } from '../../../database/entities/Car';
import { User } from '../../../database/entities/User';

interface IRequest {
    startDate: string;
    endDate: string;
    carId: number;
}

interface IResponse {
    id: number;
    startDate: string;
    endDate: string;
    carId: number;
    userId: number;
    finalValue: number;
}

class CreateUserService {
    public async execute({
        startDate,
        endDate,
        carId,
    }: IRequest, userId: number): Promise<IResponse> {
        const reserveRepository = AppDataSource.getRepository(Reserve);
        const carRepository = AppDataSource.getRepository(Car);
        const userRepository = AppDataSource.getRepository(User);

        const car = await carRepository.findOneBy({ id: carId });
        if (!car) {
            throw new AppError(
                400, 
                'Bad Request', 
                'O Carro não foi encontrado na nossa base de dados'
            );
        }

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new AppError(
                400, 
                'Bad Request', 
                'Usuário não encontrado'
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

        const conflictQuery = reserveRepository.createQueryBuilder('reserve')
            .where('reserve.userId = :userId', { userId })
            .andWhere('(:startDate <= reserve.endDate AND :endDate >= reserve.startDate)', {
                startDate,
                endDate,
            });

        const conflict = await conflictQuery.getOne();
        if (conflict) { 
            throw new AppError(
                400, 
                'Bad Request', 
                'O usuário atual já tem uma reserva no mesmo horário para qualquer carro'
            );
        }

        const start = new Date(startDate.split('/').reverse().join('-')); 
        const end = new Date(endDate.split('/').reverse().join('-'));

        const daysReserved = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const finalValue = daysReserved * car.valuePerDay;

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

        const reserve = reserveRepository.create({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            finalValue,
            car,
            user: { id: userId }
        });

        await reserveRepository.save(reserve);

        return {
            id: reserve.id,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            finalValue,
            carId: car.id,
            userId: reserve.user.id, 
        };
    }
}

export default CreateUserService;
