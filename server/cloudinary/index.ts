const cloudinary = require('cloudinary').v2;
import {CloudinaryStorage} from 'multer-storage-cloudinary'
export default cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params: async (req, file) => {
        return {
          folder: 'yelpCamp',
          allowedFormats: ['jpeg', 'png', 'jpg']
        };
    },
});

