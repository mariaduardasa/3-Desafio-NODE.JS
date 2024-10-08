import { AppDataSource } from '../../../database/data-source';
import { Reserve } from '../../../database/entities/Reserve';
import AppError from '../../middlewares/AppError';

interface IRequest {
    id: string;
}

class DeleteReserveService {
    public async execute({ id }: IRequest, userId: number): Promise<void> {
        const reserveRepository = AppDataSource.getRepository(Reserve);

        const numberId = parseInt(id);
        const reserve = await reserveRepository.findOne({
            where: { id: numberId, user: {id: userId} }, 
            relations: ['car', 'user']
        });

        if (!reserve) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há reserva com esse id'
            );
        }

        
        await reserveRepository.remove(reserve);
    }
}

export default DeleteReserveService;
