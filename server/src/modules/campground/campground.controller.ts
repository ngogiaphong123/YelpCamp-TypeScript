import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCampgroundInput, updateCampgroundInput, updateCampgroundParamsInput } from "./campground.schema";
import { createCampground, deleteCampground, getAllCampground, getCampgroundById, getCurrentUserCampground, updateCampground } from "./campground.service";
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
    const candidateCampground = await getCampgroundById(campgroundId);
    if (!candidateCampground) {
        return next({
            status: StatusCodes.NOT_FOUND,
            message: "Campground not found"
        })
    }
    if (candidateCampground.authorId !== authorId) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    }
    const newCampground = await updateCampground({ ...req.body, campgroundId });
    res.status(StatusCodes.OK).send(newCampground);
}

export const deleteCampgroundController = async (req: Request<updateCampgroundParamsInput,{},{}>, res: Response, next: NextFunction) => {
    const authorId = res.locals.user.id;
    const campgroundId = req.params.campgroundId;
    const candidateCampground = await getCampgroundById(campgroundId);
    if (!candidateCampground) {
        return next({
            status: StatusCodes.NOT_FOUND,
            message: "Campground not found"
        })
    }
    if (candidateCampground.authorId !== authorId) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    }
    await deleteCampground(campgroundId);
    res.status(StatusCodes.NO_CONTENT).send("Deleted");
}