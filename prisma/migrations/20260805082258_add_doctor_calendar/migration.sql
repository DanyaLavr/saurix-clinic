/*
  Warnings:

  - You are about to drop the column `googleCalendarId` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "googleCalendarId";

-- CreateTable
CREATE TABLE "DoctorCalendar" (
    "id" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "DoctorCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorCalendar_doctorId_key" ON "DoctorCalendar"("doctorId");

-- AddForeignKey
ALTER TABLE "DoctorCalendar" ADD CONSTRAINT "DoctorCalendar_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
