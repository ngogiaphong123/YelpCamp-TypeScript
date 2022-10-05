import { prisma } from "../../utils/prisma";
import { createCampgroundInput } from "./campground.schema";

export const createCampground = async (input : createCampgroundInput & {authorId : string}) => {
    const newCampground = await prisma.campground.create({
        data : {
            title : input.title,
            location : input.location,
            price : input.price,
            authorId : input.authorId,
            description : input.description
        }
    })
    return newCampground;
}

export const getAllCampground = async () => {
    return await prisma.campground.findMany({
        include : {
            author : {
                select : {
                    username : true
                }
            },
            images : true,
            reviews : true
        }
    });
}
export const getCurrentUserCampground = async (authorId : string) => {
    return await prisma.campground.findMany({
        where : {
            authorId
        },
        include : {
            author : {
                select : {
                    username : true
                }
            },
            images : true,
            reviews : true
        }
    })
}

export const updateCampground = async (input : createCampgroundInput & {campgroundId : string}) => {
    const campground = await prisma.campground.update({
        where : {
            id : input.campgroundId,
        },
        data : {
            title : input.title,
            location : input.location,
            price : input.price,
            description : input.description
        }
    })
    return campground;
}

export const deleteCampground = async (campgroundId : string) => {
    return await prisma.campground.delete({
        where : {
            id : campgroundId
        }
    })
}

export const getCampgroundById = async (campgroundId : string) => {
    return await prisma.campground.findUnique({
        where : {
            id : campgroundId
        }
    })
}