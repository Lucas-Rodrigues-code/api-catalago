/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "videos" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "status" "VideoStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_categories" (
    "video_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "video_categories_pkey" PRIMARY KEY ("video_id","category_id")
);

-- CreateTable
CREATE TABLE "cast_members" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cast_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_cast_members" (
    "video_id" UUID NOT NULL,
    "cast_member_id" UUID NOT NULL,

    CONSTRAINT "video_cast_members_pkey" PRIMARY KEY ("video_id","cast_member_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- AddForeignKey
ALTER TABLE "video_categories" ADD CONSTRAINT "video_categories_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_categories" ADD CONSTRAINT "video_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_cast_members" ADD CONSTRAINT "video_cast_members_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_cast_members" ADD CONSTRAINT "video_cast_members_cast_member_id_fkey" FOREIGN KEY ("cast_member_id") REFERENCES "cast_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
