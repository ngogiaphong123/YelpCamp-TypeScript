import dotenv from 'dotenv'
dotenv.config();
import express, { Response,Request } from 'express';
import logger from './utils/logger'
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
app.listen(PORT , () => {
    logger.info(`Server is running on port ${PORT}`);
})