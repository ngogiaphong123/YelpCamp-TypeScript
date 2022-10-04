import { prisma } from "../../utils/prisma";
import { createReviewInput } from "./review.schema";

export const createReview = async (input : createReviewInput & {authorId : string , campgroundId : string}) => {
    const review = await prisma.review.create({
        data : {
            rating : input.rating,
            content : input.content,
            authorId : input.authorId,
            campgroundId : input.campgroundId
        }
    })
    return review
}
export const deleteReview = async (reviewId : string) => {
    return await prisma.review.delete({
        where : {
            id : reviewId
        }
    })
}