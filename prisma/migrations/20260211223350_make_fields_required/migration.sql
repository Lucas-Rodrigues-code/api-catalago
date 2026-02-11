/*
  Warnings:

  - Made the column `description` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `release_year` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration_seconds` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "release_year" SET NOT NULL,
ALTER COLUMN "duration_seconds" SET NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
