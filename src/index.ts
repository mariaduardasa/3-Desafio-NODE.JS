import express from 'express';
import 'express-async-errors';
import { AppDataSource } from './database/data-source';
import AppError from './api/middlewares/AppError';
import { urlencoded } from 'body-parser';


AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json());
        app.use(urlencoded({ extended: true }));

        app.get('/', (req, res) => {
            res.send('Funcionando')
        })

        app.use(
            (error, req, res, next) => {
                if (error instanceof AppError) {
                    return res.status(error.code).json({
                        code: error.code,
                        status: error.status,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    code: 500,
                    status: 'Internal Server Error',
                    message: 'Ocorreu um erro inesperado.',
                });
            },
        );

        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch(error => console.log(error));
