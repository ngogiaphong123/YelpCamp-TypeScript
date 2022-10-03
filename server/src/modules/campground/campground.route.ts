import express from 'express'
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middlewares/requireUser';
import { createCampgroundController } from './campground.controller';
import { createCampgroundSchema } from './campground.schema';

const campgroundRoute = express.Router();

campgroundRoute.post('/', requireUser ,processRequestBody(createCampgroundSchema), createCampgroundController)

export default campgroundRoute;