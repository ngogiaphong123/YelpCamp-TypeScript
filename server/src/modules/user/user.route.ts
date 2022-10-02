import { loginUserSchema, registerUserSchema } from './user.schema';
import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import catchAsync from '../../utils/catchAsync';
import { registerUserController ,loginUserController} from './user.controller';

const userRoute = express.Router();
userRoute.post('/register',processRequestBody(registerUserSchema),catchAsync(registerUserController))
userRoute.post('/login',processRequestBody(loginUserSchema),catchAsync(loginUserController))
export default userRoute