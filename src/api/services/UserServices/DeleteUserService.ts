import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';

interface IRequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const numberId = parseInt(id);
        const user = await userRepository.findOneBy({ id: numberId });

        if (!user) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há usuario com esse id'
            );
        }

        
        await userRepository.remove(user);
    }
}

export default DeleteUserService;
