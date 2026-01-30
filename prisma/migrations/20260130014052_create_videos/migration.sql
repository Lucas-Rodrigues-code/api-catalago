-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('uploaded', 'processing', 'encoded', 'published', 'blocked');

-- CreateTable
CREATE TABLE "Video" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "release_year" INTEGER,
    "duration_seconds" INTEGER,
    "status" "VideoStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
