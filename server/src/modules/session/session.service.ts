import { prisma } from "../../utils/prisma"
export const createSession = (userId : string , userAgent : string) => {
    return prisma.session.create({
        data: {
            userId,
            userAgent
        }
    })
}