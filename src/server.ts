import { User } from '@prisma/client';
import App from './app';


declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

App.listen(process.env.SERVER_PORT, () => {
    console.log('Servidor Rodando');
});