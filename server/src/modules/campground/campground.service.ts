import { prisma } from "../../utils/prisma";
import { createCampgroundInput } from "./campground.schema";

export const createCampground = async (input : createCampgroundInput & {authorId : string}) => {
    const newCampground = await prisma.campground.create({
        data : {
            title : input.title,
            location : input.location,
            image : input.image,
            price : input.price,
            authorId : input.authorId,
            description : input.description
        }
    })
    return newCampground;
}