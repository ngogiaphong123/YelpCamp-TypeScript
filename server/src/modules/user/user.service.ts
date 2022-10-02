import { hashPassword } from "../../utils/hash";
import { prisma } from "../../utils/prisma";
import { registerUserInput } from "./user.schema";

export const registerUser = async (user : Omit<registerUserInput, 'confirmPassword'>) => {
    const {email,username,password} = user;
    const {hash,salt} = hashPassword(password);
    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hash,
            salt
        },
        select: {
            id : true,
            email : true,
            username : true
        }
    })
    return newUser;
}
export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user;
}