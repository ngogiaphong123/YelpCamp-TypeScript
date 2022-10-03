import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCampgroundInput } from "./campground.schema";
import { createCampground } from "./campground.service";

export const createCampgroundController = async (req : Request<{},{},createCampgroundInput>, res : Response, next : NextFunction) => {
    const authorId = res.locals.user.id
    const campground = await createCampground({...req.body, authorId})
    res.status(StatusCodes.CREATED).send(campground);
}