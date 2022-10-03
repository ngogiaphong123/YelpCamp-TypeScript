import { NextFunction, Request, Response } from "express";
import _ from 'lodash'
import { reIssueAccessToken } from "../modules/session/session.service";
import { verifyJwt } from "../utils/jwt.utils";
const deserializeUser = async (req: Request, res: Response, next : NextFunction) => {
    const accessToken = _.get(req.cookies, "accessToken") || _.get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );
    const refreshToken = _.get(req.cookies, "refreshToken") || _.get(req, "headers.x-refresh", "");
    if(!accessToken) {
        return next();
    }
    const {decoded , expired} = verifyJwt(accessToken);
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }
    if(expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken);
        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
            res.cookie('accessToken', newAccessToken, {
                maxAge: 900000,
                httpOnly: true,
                domain: 'localhost',
                path: '/',
                sameSite: "strict",
                secure: false,
            })
            const { decoded } = verifyJwt(newAccessToken as string);
            res.locals.user = decoded;
            return next();
        }
    }
    return next();
}
export default deserializeUser