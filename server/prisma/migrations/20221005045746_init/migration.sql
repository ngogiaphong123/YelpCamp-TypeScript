-- DropForeignKey
ALTER TABLE "Campground" DROP CONSTRAINT "Campground_authorId_fkey";

-- AlterTable
ALTER TABLE "Campground" ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Campground" ADD CONSTRAINT "Campground_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
