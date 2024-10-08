import express from 'express';
import 'express-async-errors';
import { AppDataSource } from './database/data-source';
import { errors } from 'celebrate';
import AppError from './api/middlewares/AppError';
import { urlencoded } from 'body-parser';
import routes from './routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import doc from '../documentation/openapi.json';



AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json());
        app.use(urlencoded({ extended: true }));

        const options = {
            definition: doc,
            apis: ['./src/routes/*.ts']
        };

        const specs = swaggerJsdoc(options);
        app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
        app.use('/v1', routes);

        app.use(errors());


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
