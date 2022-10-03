import cities from './cities';
import { places , descriptors} from './seedHelpers';
import { prisma } from '../utils/prisma';
const sample = (array : Array<string>) => {
    return array[Math.floor(Math.random() * array.length)];
}
const seedDB = async () => {
    await prisma.campground.deleteMany({});
    for(let i = 0 ; i < 200 ; i++) {
        const price = Math.floor(Math.random() * 20) + 10
        const random1000 = Math.floor(Math.random() * 1000);
        const campground = await prisma.campground.create({
            data: {
                title : `${sample(descriptors)} ${sample(places)}`,
                location : `${cities[random1000].city}, ${cities[random1000].state}`,
                image : 'https://source.unsplash.com/collection/483251',
                authorId : '22c9547f-b34f-4e90-a56d-7568ea97434e'
            }
        })
        console.log(campground)
    }
}
seedDB().then(() => {
    console.log('Database seeded');
    process.exit(0);
})