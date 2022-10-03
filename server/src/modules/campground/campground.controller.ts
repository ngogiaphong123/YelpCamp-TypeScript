import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCampgroundInput, updateCampgroundInput, updateCampgroundParamsInput } from "./campground.schema";
import { createCampground, getAllCampground, getCurrentUserCampground, updateCampground } from "./campground.service";

export const createCampgroundController = async (req: Request<{}, {}, createCampgroundInput>, res: Response, next: NextFunction) => {
    const authorId = res.locals.user.id
    const campground = await createCampground({ ...req.body, authorId })
    res.status(StatusCodes.CREATED).send(campground);
}
export const getAllCampgroundController = async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await getAllCampground();
    res.status(StatusCodes.OK).send(campgrounds);
}

export const getCurrentUserCampgroundController = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = res.locals.user.id;
    const campgrounds = await getCurrentUserCampground(authorId);
    res.status(StatusCodes.OK).send(campgrounds);
}

export const updateCampgroundController = async (req: Request<updateCampgroundParamsInput,{},updateCampgroundInput>, res: Response, next: NextFunction) => {
    const authorId = res.locals.user.id;
    const campgroundId = req.params.campgroundId;
    const campground = await updateCampground({ ...req.body, campgroundId });
    if(authorId !== campground.authorId) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
    }
    res.status(StatusCodes.OK).send(campground);
}