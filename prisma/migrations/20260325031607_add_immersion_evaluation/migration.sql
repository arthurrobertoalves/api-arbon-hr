/*
  Warnings:

  - Added the required column `immersionId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImmersionStatus" AS ENUM ('OPEN', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Recommendation" AS ENUM ('HIRE', 'CONSIDER', 'NOT_RECOMMENDED');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "immersionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Immersion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ImmersionStatus" NOT NULL DEFAULT 'OPEN',
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Immersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "leadershipScore" INTEGER,
    "decisionScore" INTEGER,
    "communicationScore" INTEGER,
    "adaptabilityScore" INTEGER,
    "pressureScore" INTEGER,
    "overallScore" INTEGER,
    "strengths" TEXT,
    "risks" TEXT,
    "observations" TEXT,
    "recommendation" "Recommendation" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_participantId_key" ON "Evaluation"("participantId");

-- AddForeignKey
ALTER TABLE "Immersion" ADD CONSTRAINT "Immersion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_immersionId_fkey" FOREIGN KEY ("immersionId") REFERENCES "Immersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
