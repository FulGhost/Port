/*
  Warnings:

  - Changed the type of `contact` on the `VisitorLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tag` on the `VisitorLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "VisitorLog" DROP COLUMN "contact",
ADD COLUMN     "contact" INTEGER NOT NULL,
DROP COLUMN "tag",
ADD COLUMN     "tag" INTEGER NOT NULL;
