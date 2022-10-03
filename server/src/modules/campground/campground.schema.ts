import {z} from 'zod'

export const createCampgroundSchema = z.object({
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
})
export type createCampgroundInput = z.infer<typeof createCampgroundSchema>