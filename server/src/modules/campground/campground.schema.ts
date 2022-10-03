import {z} from 'zod'
const campgroundCore = {
    title : z.string({
        required_error : 'Title is required'
    }),
    location : z.string({
        required_error : 'Location is required'
    }),
    image : z.string({
        required_error : 'Image is required'
    }),
    price : z.number({
        required_error : 'Price is required'
    }),
    description : z.string({
        required_error : 'Description is required'
    })
}
export const createCampgroundSchema = z.object({
    ...campgroundCore
})
export const updateCampgroundSchema = z.object({
    ...campgroundCore
})
export const updateCampgroundParamsSchema = z.object({
    campgroundId : z.string({
        required_error : 'Campground id is required'
    })
})
export type updateCampgroundParamsInput = z.infer<typeof updateCampgroundParamsSchema>
export type updateCampgroundInput = z.infer<typeof updateCampgroundSchema>
export type createCampgroundInput = z.infer<typeof createCampgroundSchema>