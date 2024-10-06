import { sign } from 'jsonwebtoken'; 
import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';
import authConfig from '../../config/authConfig';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    accessToken: string; 
}

class CreateAuthService {
    public async execute({
        email,
        password,
    }: IRequest): Promise<IResponse> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });
        
        if (!user) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há usuario com esse Email ou Senha'
            );
        }

        if (user.password !== password) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há usuario com esse Email ou Senha'
            );
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id.toString(),
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, accessToken: token }; 
    }
}

export default CreateAuthService;
