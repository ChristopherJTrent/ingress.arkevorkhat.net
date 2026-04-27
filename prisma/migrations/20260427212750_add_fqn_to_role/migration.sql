/*
  Warnings:

  - Added the required column `fqn` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fqn" TEXT NOT NULL
);
INSERT INTO "new_Role" ("id") SELECT "id" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_fqn_key" ON "Role"("fqn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
