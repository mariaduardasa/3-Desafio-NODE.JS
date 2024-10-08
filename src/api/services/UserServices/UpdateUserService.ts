import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../database/entities/User';
import AppError from '../../middlewares/AppError';
import { validate as isValidCPF } from 'cpf-check';
import axios from 'axios';
import formatDate from '../../middlewares/formatDate';

interface IRequest {
    id: string;
    name?: string;
    cpf?: string;
    birth?: string; 
    cep?: string;
    email?: string;
    password?: string;
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

class UpdateUserService {
    public async execute({
        id,
        name,
        cpf,
        birth,
        cep,
        email,
        password,
    }: IRequest): Promise<IUserResponse> {
        const userRepository = AppDataSource.getRepository(User);
        const numberId = parseInt(id);

        const user = await userRepository.findOneBy({ id: numberId });
        if (!user) {
            throw new AppError(
                404, 
                'Not found', 
                'Não há usuário com esse id'
            );
        }

        if (cpf !== undefined) {
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
            user.cpf = cpf;
        }

        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new AppError(
                    400, 
                    'Bad Request', 
                    'O endereço de e-mail fornecido deve ser válido.'
                );
            }

            const existingUserByEmail = await userRepository.findOneBy({ email });
            if (existingUserByEmail) {
                throw new AppError(
                    400, 
                    'Bad Request', 
                    'O endereço de e-mail deve ser único na base de dados do sistema.'
                );
            }
            user.email = email;
        }

        if (password !== undefined) {
            if (password.length < 6) {
                throw new AppError(
                    400, 
                    'Bad Request', 
                    'A senha deve ter pelo menos 6 caracteres.'
                );
            }
            user.password = password;
        }

        let formattedBirth;
        let isQualified = false;
        if (birth !== undefined) {
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
            isQualified = age > 18 || (age === 18 && (today.getMonth() > birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())));

                user.birth = formattedBirth;
        }
        
        let addressData = null;
        if (cep !== undefined) {
            const formattedCep = cep.replace(/[^0-9]/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2');
            const response = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
            addressData = response.data;

            if (addressData.erro) {
                throw new AppError(
                    400, 
                    'Bad Request', 
                    'O CEP fornecido não é válido.'
                );
            }
            user.cep = formattedCep;
        }

        if (name !== undefined) user.name = name;

        await userRepository.save(user);

        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            birth: formattedBirth ?? user.birth, 
            email: user.email,
            qualified: isQualified, 
            cep: user.cep,
            neighbordhood: addressData?.bairro,
            street: addressData?.logradouro,
            complement: addressData?.complemento,
            city: addressData?.localidade,
            uf: addressData?.uf,
        };
    }
}

export default UpdateUserService;
