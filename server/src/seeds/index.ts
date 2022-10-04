import cities from './cities';
import { places , descriptors} from './seedHelpers';
import { prisma } from '../utils/prisma';
const sample = (array : Array<string>) => {
    return array[Math.floor(Math.random() * array.length)];
}
const seedDB = async () => {
    await prisma.campground.deleteMany({});
    for(let i = 0 ; i < 5 ; i++) {
        const price = Math.floor(Math.random() * 20) + 10
        const random1000 = Math.floor(Math.random() * 1000);
        const campground = await prisma.campground.create({
            data: {
                title : `${sample(descriptors)} ${sample(places)}`,
                location : `${cities[random1000].city}, ${cities[random1000].state}`,
                image : 'https://source.unsplash.com/collection/483251',
                authorId : 'eacec14c-8b3a-461c-9aa6-19e714a2680d',
                price : price,
                description : "lorem"
            }
        })
        console.log(campground)
    }
}
//! Use npx ts-node server/src/seeds/index.ts to run the seed file
seedDB().then(() => {
    console.log('Database seeded');
    process.exit(0);
})