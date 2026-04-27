/*
  Warnings:

  - You are about to drop the column `path` on the `Service` table. All the data in the column will be lost.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
-- CREATE TABLE "new_Service" (
--     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
--     "name" TEXT NOT NULL
-- );
-- INSERT INTO "new_Service" ("id") SELECT "id" FROM "Service";
-- DROP TABLE "Service";
-- ALTER TABLE "new_Service" RENAME TO "Service";
-- CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");
ALTER TABLE "Service" RENAME COLUMN "path" TO "name";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
