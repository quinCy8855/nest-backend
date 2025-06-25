/*
  Warnings:

  - You are about to drop the `WorkLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WorkLog";

-- CreateTable
CREATE TABLE "WORKLOG" (
    "id" SERIAL NOT NULL,
    "BUSINESS_AREA" TEXT NOT NULL,
    "START_DATE" TIMESTAMP(3) NOT NULL,
    "END_DATE" TIMESTAMP(3) NOT NULL,
    "TIME_SPENT_PER_DAY" TEXT NOT NULL,
    "DESCRIPTION" TEXT,
    "CREATED_BY" TEXT NOT NULL,
    "CREATED_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WORKLOG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_notes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "is_today" BOOLEAN NOT NULL DEFAULT false,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "contentFromUser" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);
