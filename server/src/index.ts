import dotenv from 'dotenv'
dotenv.config();
import express, { Response,Request, NextFunction } from 'express';
import logger from './utils/logger'
import ExpressError from './utils/expressError';
import { StatusCodes } from 'http-status-codes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.get('/healthcheck', (req : Request, res : Response) => {
    res.send('ok');
})
app.post('/api/users/register', (req : Request , res : Response) => {

    res.send(req.body)
})
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message)
})
app.listen(PORT , () => {
    logger.info(`Server is running on port ${PORT}`);
})