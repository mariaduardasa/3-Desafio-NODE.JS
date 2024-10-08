import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';


interface IRequest {
    id: string;
}

class ShowUserService {
    public async execute({ id }: IRequest): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);
        const numberId = parseInt(id);
        const user = await userRepository.findOne({
            where: { id: numberId }
        });

        if (!user) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há usuario com esse id'
            );
        }
        
        return user;
    }
}

export default ShowUserService;
