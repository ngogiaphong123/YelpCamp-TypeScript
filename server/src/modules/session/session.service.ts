import { signJwt, verifyJwt } from "../../utils/jwt.utils";
import { prisma } from "../../utils/prisma"
import dotenv from 'dotenv'
dotenv.config();
import _ from 'lodash'
export const createSession = (userId : string , userAgent : string) => {
    return prisma.session.create({
        data: {
            userId,
            userAgent
        }
    })
}

export const reIssueAccessToken = async (refreshToken : string) => {
    const accessTokenTtl = "15m";
    const { decoded } = verifyJwt(refreshToken);
    if (!decoded || !_.get(decoded, "sessionId")) {
        return false;
    }
    const sessionId = _.get(decoded, "sessionId");
    const session = await prisma.session.findUnique({
        where: {
            id: sessionId
        }
    })
    if (!session || !session.valid) {
        return false;
    }
    const userId = _.get(session, "userId");
    const user = await prisma.user.findUnique({
        where : {
            id : userId
        }
    })
    if (!user) {
        return false;
    }
    const {password, salt, ...rest} = user;
    const accessToken = signJwt(
        { ...rest , sessionId: sessionId },
        { expiresIn:  accessTokenTtl}
    );
    return accessToken;
}

export const deleteSession = async (sessionId : string) => {
    await prisma.session.update({
        where : {
            id : sessionId
        },
        data : {
            valid : false
        }
    })
}