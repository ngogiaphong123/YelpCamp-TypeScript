import {z} from 'zod'
const userCore = {
    email : z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Email is not valid'
    }),
    password : z.string({
        required_error: 'Password is required'
    }).min(6,{
        message: 'Password must be at least 6 characters'
    }),
}
export const registerUserSchema = z.object({
    username : z.string({
        required_error: 'Username is required'
    }),
    confirmPassword : z.string({
        required_error: 'Confirm password is required'
    }).min(6,{
        message: 'Confirm password must be at least 6 characters'
    }),
    ...userCore
}).refine(data => data.password === data.confirmPassword, {
    message: 'Password and confirm password must be the same',
    path: ['confirmPassword']
})
export const loginUserSchema = z.object({
    ...userCore
})
export type loginUserInput = z.infer<typeof loginUserSchema>
export type registerUserInput = z.infer<typeof registerUserSchema>
