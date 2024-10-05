import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import formatDate from '../../middlewares/formatDate';
import AppError from '../../middlewares/AppError';
import { validate as isValidCPF } from 'cpf-check';
import axios from 'axios';

interface IRequest {
    name: string;
    cpf: string;
    birth: string;
    cep: string;
    email: string;
    password: string;
}

interface IUserResponse {
    id: number;
    name: string;
    cpf: string;
    birth: string;
    email: string;
    qualified: boolean;
    cep: string;
    neighbordhood: string;
    street: string;
    complement: string;
    city: string;
    uf: string;

}

class CreateUserService {
    public async execute({
        name,
        cpf,
        birth,
        cep,
        email,
        password,
    }: IRequest): Promise<IUserResponse> {
        const userRepository = AppDataSource.getRepository(User);

        
        if (!isValidCPF(cpf)) {
            throw new AppError(
                400, 
                'Bad Request', 
                'O CPF fornecido deve ser válido.'
            );
        }

   
        const existingUserByCpf = await userRepository.findOneBy({ cpf });
        if (existingUserByCpf) {
            throw new AppError(
                400, 
                'Bad Request', 
                'O CPF deve ser único na base de dados do sistema.'
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError(
                400, 
                'Bad Request', 
                'O endereço de e-mail fornecido deve ser válido.'
            );
        }

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            throw new AppError(
                400, 
                'Bad Request', 
                'O endereço de e-mail deve ser único na base de dados do sistema.'
            );
        }
        if (password.length < 6){
            throw new AppError(
                400, 
                'Bad Request', 
                'A senha deve ter pelo menos 6 caracteres.'
            );
        }

        let formattedBirth;
        try {
            formattedBirth = await formatDate(birth);
        } catch (_error) {
            throw new AppError(
                400, 
                'Bad Request', 
                'Birth não está no padrão dd/mm/yyyy'
            );
        }

        const [day, month, year] = formattedBirth.split('/').map(Number);
        const birthDate = new Date(year, month - 1, day); 
        const today = new Date();

        const age = today.getFullYear() - birthDate.getFullYear();
        const isQualified = age > 18 || (age === 18 && (today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())));

        const formattedCep = cep.replace(/[^0-9]/g, '')
        const { data } = await axios.get(`https://viacep.com.br/ws/${formattedCep }/json/`)

        const user = userRepository.create({
            name,
            cpf,
            birth: formattedBirth, 
            cep: data.cep,
            email,
            password,
        });

        await userRepository.save(user);

        return {
            id: user.id, 
            name: user.name,
            cpf: user.cpf,
            birth: formattedBirth,
            email: user.email,
            qualified: isQualified,
            cep: user.cep,
            neighbordhood: data.bairro,
            street: data.logradouro,
            complement: data.complemento,
            city: data.localidade,
            uf: data.uf,
        }
    }
}

export default CreateUserService;
