/*
  Warnings:

  - Added the required column `email` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "dateOfestablishment" DROP NOT NULL,
ALTER COLUMN "dateOfestablishment" SET DATA TYPE TEXT,
ALTER COLUMN "NumOfStudents" DROP NOT NULL,
ALTER COLUMN "NumOfTeachers" DROP NOT NULL,
ALTER COLUMN "NumOfNonTeachingStaff" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "age" DROP NOT NULL;
