import express from 'express'
import { processRequestBody, processRequestParams } from 'zod-express-middleware';
import requireUser from '../../middlewares/requireUser';
import { createCampgroundController, getAllCampgroundController, getCurrentUserCampgroundController, updateCampgroundController } from './campground.controller';
import { createCampgroundSchema, updateCampgroundParamsSchema, updateCampgroundSchema,  } from './campground.schema';

const campgroundRoute = express.Router();

campgroundRoute.post('/', requireUser, processRequestBody(createCampgroundSchema), createCampgroundController)
campgroundRoute.get('/', getAllCampgroundController)
campgroundRoute.get('/me', requireUser, getCurrentUserCampgroundController)
campgroundRoute.put('/:campgroundId', 
    requireUser,
    processRequestParams(updateCampgroundParamsSchema),
    processRequestBody(updateCampgroundSchema),
    updateCampgroundController
)
export default campgroundRoute;