import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { registerUserInput } from "./user.schema";
import { registerUser } from "./user.service";

export const registerUserController = async (req: Request<{}, {}, registerUserInput>, res: Response, next: NextFunction) => {
    const {email,username,password} = req.body;
    const user = await registerUser({email,username,password});
    res.status(StatusCodes.CREATED).send(user);
}