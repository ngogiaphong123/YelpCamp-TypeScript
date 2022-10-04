import { StatusCodes } from 'http-status-codes';
import { createReviewInput, createReviewParam, deleteReviewParam } from './review.schema';
import { Request,Response,NextFunction } from "express";
import { createReview, deleteReview } from './review.service';
import { getCampgroundById } from '../campground/campground.service';

export const createReviewController = async (req: Request<createReviewParam,{},createReviewInput>, res: Response,next : NextFunction) => {
    const authorId = res.locals.user.id
    const campgroundId = req.params.campgroundId
    const review = await createReview({...req.body,authorId,campgroundId})
    res.status(StatusCodes.CREATED).send(review)
}

export const deleteReviewController = async (req: Request<deleteReviewParam,{},{}>, res: Response,next : NextFunction) => {
    const authorId = res.locals.user.id
    const {reviewId,campgroundId} = req.params
    const campground = await getCampgroundById(campgroundId);
    if(!campground){
        return next({
            status : StatusCodes.NOT_FOUND,
            message : "Campground not found"
        })
    }
    if(campground.authorId !== authorId){
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized")
    }
    await deleteReview(reviewId)
    res.status(StatusCodes.NO_CONTENT).send("Deleted")
}