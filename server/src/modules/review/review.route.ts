import express from 'express'
import { processRequestBody, processRequestParams } from 'zod-express-middleware'
import requireUser from '../../middlewares/requireUser'
import { createReviewController, deleteReviewController } from './review.controller'
import { createReviewParamsSchema, createReviewSchema, deleteReviewParamsSchema } from './review.schema'

const reviewRoute = express.Router({
    mergeParams: true
})
reviewRoute.post('/',requireUser,processRequestParams(createReviewParamsSchema),processRequestBody(createReviewSchema),createReviewController)
reviewRoute.delete('/:reviewId',requireUser,processRequestParams(deleteReviewParamsSchema),deleteReviewController)
export default reviewRoute