-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_immersionId_fkey";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_immersionId_fkey" FOREIGN KEY ("immersionId") REFERENCES "Immersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
