/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'RETAIL', 'INDUSTRY');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sector" "Sector" NOT NULL,
ADD COLUMN     "site" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
