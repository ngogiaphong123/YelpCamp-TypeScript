-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_campgroundId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_campgroundId_fkey" FOREIGN KEY ("campgroundId") REFERENCES "Campground"("id") ON DELETE CASCADE ON UPDATE CASCADE;
