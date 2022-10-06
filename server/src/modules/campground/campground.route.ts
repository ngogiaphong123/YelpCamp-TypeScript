import express from 'express'
import { processRequestBody, processRequestParams } from 'zod-express-middleware';
import requireUser from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { createCampgroundController, deleteCampgroundController, getAllCampgroundController, getCampgroundByIdController, getCurrentUserCampgroundController, updateCampgroundController } from './campground.controller';
import { createCampgroundSchema, updateCampgroundParamsSchema, updateCampgroundSchema,  } from './campground.schema';
import multer from 'multer';
import cloudinary , {storage} from '../../../cloudinary';
const upload = multer({storage});
const campgroundRoute = express.Router();
//processRequestBody(createCampgroundSchema)
campgroundRoute.post('/', requireUser,upload.array('image',5), processRequestBody(createCampgroundSchema),catchAsync(createCampgroundController))
campgroundRoute.get('/', catchAsync(getAllCampgroundController))
campgroundRoute.get('/me', requireUser, catchAsync(getCurrentUserCampgroundController))
campgroundRoute.get('/:campgroundId',requireUser, processRequestParams(updateCampgroundParamsSchema), catchAsync(getCampgroundByIdController))
campgroundRoute.put('/:campgroundId', 
    requireUser,
    processRequestParams(updateCampgroundParamsSchema),
    processRequestBody(updateCampgroundSchema),
    catchAsync(updateCampgroundController)
)
campgroundRoute.delete('/:campgroundId', requireUser,processRequestParams(updateCampgroundParamsSchema), catchAsync(deleteCampgroundController))
export default campgroundRoute;