import express from 'express'
import { processRequestBody, processRequestParams } from 'zod-express-middleware';
import requireUser from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { createCampgroundController, deleteCampgroundController, getAllCampgroundController, getCurrentUserCampgroundController, updateCampgroundController } from './campground.controller';
import { createCampgroundSchema, updateCampgroundParamsSchema, updateCampgroundSchema,  } from './campground.schema';

const campgroundRoute = express.Router();

campgroundRoute.post('/', requireUser, processRequestBody(createCampgroundSchema), catchAsync(createCampgroundController))
campgroundRoute.get('/', catchAsync(getAllCampgroundController))
campgroundRoute.get('/me', requireUser, catchAsync(getCurrentUserCampgroundController))
campgroundRoute.put('/:campgroundId', 
    requireUser,
    processRequestParams(updateCampgroundParamsSchema),
    processRequestBody(updateCampgroundSchema),
    catchAsync(updateCampgroundController)
)
campgroundRoute.delete('/:campgroundId', requireUser,processRequestParams(updateCampgroundParamsSchema), catchAsync(deleteCampgroundController))
export default campgroundRoute;