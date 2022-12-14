import dotenv from 'dotenv'
dotenv.config();
import express, { Response,Request, NextFunction } from 'express';
import logger from './utils/logger'
import cookieParser from 'cookie-parser'
import ExpressError from './utils/expressError';
import { StatusCodes } from 'http-status-codes';
import userRoute from './modules/user/user.route';
import bodyParser from 'body-parser';
import deserializeUser from './middlewares/deserializeUser';
import campgroundRoute from './modules/campground/campground.route';
import reviewRoute from './modules/review/review.route';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(deserializeUser)
const PORT = process.env.PORT || 3000;
app.get('/healthcheck', (req : Request, res : Response) => {
    res.send('ok');
})
app.use('/api/users',userRoute)
app.use('/api/campgrounds',campgroundRoute)
app.use('/api/campgrounds/:campgroundId/reviews',reviewRoute)
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