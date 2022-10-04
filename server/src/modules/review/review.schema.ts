import {z} from 'zod'

export const createReviewSchema = z.object({
    rating : z.number({
        required_error : 'Rating is required'
    }).min(1,'Rating must be greater than 1').max(5,'Rating must be less than 5'),
    content : z.string({
        required_error : 'Content is required'
    })
})
export const createReviewParamsSchema = z.object({
    campgroundId : z.string({
        required_error : 'Campground id is required'
    }),
})
export const deleteReviewParamsSchema = z.object({
    reviewId : z.string({
        required_error : 'Review id is required'
    }),
    campgroundId : z.string({
        required_error : 'Campground id is required'
    }),
})
export type deleteReviewParam = z.infer<typeof deleteReviewParamsSchema>
export type createReviewParam = z.infer<typeof createReviewParamsSchema>
export type createReviewInput = z.infer<typeof createReviewSchema>